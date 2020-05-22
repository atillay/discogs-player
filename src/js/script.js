import ReactDOM from "react-dom";
import React from "react";
import ReactShadow from "react-shadow";
import AudioPlayer from "./components/AudioPlayer";
import PlayButton from "./components/PlayButton";

const fs = require('fs');
const h5audioPlayerStyles = fs.readFileSync('node_modules/react-h5-audio-player/lib/styles.css', 'utf-8');
const audioPlayerStyles = fs.readFileSync('src/css/audio-player.css', 'utf-8');

const pageUrl = window.location.href;

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

const renderPlayer = (injectDom, playlist, vinylMeta) => {
    ReactDOM.render(
        <ReactShadow.div>
            <AudioPlayer playlist={playlist} vinylMeta={vinylMeta}/>
            <style type="text/css">
                {h5audioPlayerStyles}
                {audioPlayerStyles}
            </style>
        </ReactShadow.div>,
        injectDom
    );
};
const emptyPlayer = (injectDom) => {
    ReactDOM.render(<div/>, injectDom);
};

const loadDiscogsPlayer = () => {
    // Append player div
    const injectDOM = document.createElement('div');
    document.body.insertBefore(injectDOM, document.body.firstChild);

    // Render play buttons
    document.querySelectorAll('.table_block tbody tr').forEach(vinylRow => {

        const vinylFullTitle = vinylRow.querySelector('.item_description_title').innerHTML;

        const vinylMeta = {
            title: cleanContent(vinylFullTitle.split(' - ')[1]),
            artist: cleanContent(vinylFullTitle.split(' - ')[0]),
            label: cleanContent(vinylRow.querySelector('.label_and_cat a').innerHTML),
            cover: vinylRow.querySelector('.marketplace_image, .marketplace_image_placeholder').getAttribute('data-src')
        };

        // Play button dom element
        const insertInsideDom = vinylRow.querySelector('.item_add_to_cart');
        const playButtomDom = document.createElement('div');
        insertInsideDom.appendChild(playButtomDom);
        const handlePlay = (setStatus) => {
            setStatus('loading');
            emptyPlayer(injectDOM);
            chrome.runtime.sendMessage({
                searchVinyl: vinylMeta
            }, {}, (playlist) => {
                if (!playlist) {
                    setStatus('error')
                } else {
                    setStatus(null);
                    renderPlayer(injectDOM, playlist, vinylMeta)
                }
            });
        };
        ReactDOM.render(
            <PlayButton handlePlay={handlePlay}/>,
            playButtomDom
        );
    });
};

// TODO : load on supported discogs pages only
// TODO : support single vinyl page
document.body.onload = () => {
    loadDiscogsPlayer();
};
