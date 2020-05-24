import ReactDOM from "react-dom";
import React from "react";
import ReactShadow from "react-shadow";
import AudioPlayer from "./components/AudioPlayer";
import PlayButton from "./components/PlayButton";

const fs = require('fs');
const h5audioPlayerStyles = fs.readFileSync('node_modules/react-h5-audio-player/lib/styles.css', 'utf-8');
const audioPlayerStyles = fs.readFileSync('src/css/audio-player.css', 'utf-8');

const pageUrl = window.location.href;

/**
 * Clean vinyl name, artist and label string
 * @param content
 * @returns {string}
 */
const cleanContent = (content) => {
    // Clean html chars
    const parser = new DOMParser;
    const dom = parser.parseFromString(`<!doctype html><body>${content}`, 'text/html');
    content = dom.body.textContent;
    // Remove content after first parentheses
    if (content.indexOf('(') !== -1) {
        content = content.substring(0, content.indexOf('('))
    }
    // Remove name ending with E.P.
    if (content.indexOf('E.P.') !== -1) {
        content = content.substring(0, content.indexOf('E.P.'))
    }
    return content.trim();
};

/**
 * Render player
 * @param playerDom
 * @param playlist
 * @param vinylMeta
 */
const renderPlayer = (playerDom, playlist, vinylMeta) => {
    ReactDOM.render(
        <ReactShadow.div>
            <AudioPlayer playlist={playlist} vinylMeta={vinylMeta}/>
            <style type="text/css">
                {h5audioPlayerStyles}
                {audioPlayerStyles}
            </style>
        </ReactShadow.div>,
        playerDom
    );
};

/**
 * Empty player dom
 * @param playerDom
 */
const emptyPlayer = (playerDom) => {
    ReactDOM.render(<div/>, playerDom);
};

/**
 * Render play button
 * @param playButtonDom
 * @param playerDom
 * @param vinylMeta
 */
const renderPlayButton = (playButtonDom, playerDom, vinylMeta) => {
    ReactDOM.render(
        <PlayButton handlePlay={(setStatus) => {
            setStatus('loading');
            emptyPlayer(playerDom);
            chrome.runtime.sendMessage({
                searchVinyl: vinylMeta
            }, {}, (playlist) => {
                if (!playlist) {
                    setStatus('error')
                } else {
                    setStatus(null);
                    renderPlayer(playerDom, playlist, vinylMeta)
                }
            });
        }}/>,
        playButtonDom
    );
};

/**
 * Load Discogs player
 * - Append player container
 * - Append play buttons
 */
const loadDiscogsPlayer = () => {

    // Only support sell pages
    if (pageUrl.indexOf('/sell/') === -1 && pageUrl.indexOf('/seller/') === -1) {
        return;
    }

    // Append player div
    const playerDom = document.createElement('div');
    document.body.insertBefore(playerDom, document.body.firstChild);

    // Marketplace list page
    document.querySelectorAll('.table_block tbody tr').forEach(vinylRow => {

        // Extract vinyl information
        const vinylFullTitle = vinylRow.querySelector('.item_description_title').innerHTML;
        const vinylMeta = {
            title: cleanContent(vinylFullTitle.split(' - ')[1]),
            artist: cleanContent(vinylFullTitle.split(' - ')[0]),
            label: cleanContent(vinylRow.querySelector('.label_and_cat a').innerHTML),
            cover: vinylRow.querySelector('.marketplace_image, .marketplace_image_placeholder').getAttribute('data-src')
        };

        // Append play button
        const insertInsideDom = vinylRow.querySelector('.item_add_to_cart');
        const playButtonDom = document.createElement('div');
        insertInsideDom.appendChild(playButtonDom);
        
        renderPlayButton(playButtonDom, playerDom, vinylMeta);
    });

    // Marketplace single page
    if (pageUrl.indexOf('/sell/item/') !== -1) {
        // Extract vinyl information
        const metaExtract = document.querySelector('meta[name="keywords"]').getAttribute('content').split(' - ');
        const vinylMeta = {
            title: cleanContent(metaExtract[1]),
            artist: cleanContent(metaExtract[0]),
            label: cleanContent(metaExtract[2]),
            cover: document.querySelector('.thumbnail_center img').getAttribute('src')
        };

        // Append play button
        const insertInsideDom = document.querySelector('.body');
        const playButtonDom = document.createElement('div');
        insertInsideDom.appendChild(playButtonDom);

        renderPlayButton(playButtonDom, playerDom, vinylMeta);
    }
};

// Trigger load Discogs player when page is ready
document.body.onload = () => {
    loadDiscogsPlayer();
};
