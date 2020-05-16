import ReactDOM from "react-dom";
import React from "react";
import ReactShadow from "react-shadow";
import AudioPlayer from "./components/AudioPlayer";
import PlayButton from "./components/PlayButton";

const fs = require('fs');
const h5audioPlayerStyles = fs.readFileSync('node_modules/react-h5-audio-player/lib/styles.css', 'utf-8');
const audioPlayerStyles = fs.readFileSync('src/css/audio-player.css', 'utf-8');

const pageUrl = window.location.href;

const isDiscogsListPage = pageUrl.indexOf('https://www.discogs.com') === 0;

const cleanContent = (content) => {
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

const renderPlayer = (injectDom, playlist, coverUrl) => {
    ReactDOM.render(
        <ReactShadow.div>
            <AudioPlayer playlist={playlist} coverUrl={coverUrl}/>
            <style type="text/css">
                {h5audioPlayerStyles}
                {audioPlayerStyles}
            </style>
        </ReactShadow.div>,
        injectDom
    );
};
const emptyPlayer = (injectDom) => {
    ReactDOM.render(
        <div></div>,
        injectDom
    );
};

if (isDiscogsListPage) {

    // Render player
    const injectDOM = document.createElement('div');
    document.body.insertBefore(injectDOM, document.body.firstChild);

    const playButtonsDom = [];

    // Add listen button
    document.querySelectorAll('.table_block tbody tr').forEach(vinylRow => {

        const vinylTitle = vinylRow.querySelector('.item_description_title').innerHTML;
        const vinylCover = vinylRow.querySelector('.marketplace_image').getAttribute('src');

        const vinyl = {
            title: cleanContent(vinylTitle.split(' - ')[1]),
            artist: cleanContent(vinylTitle.split(' - ')[0]),
            label: cleanContent(vinylRow.querySelector('.label_and_cat a').innerHTML)
        };

        // Play button dom element
        const insertInsideDom = vinylRow.querySelector('.item_add_to_cart');
        const playButtomDom = document.createElement('div');
        insertInsideDom.appendChild(playButtomDom);
        const handlePlay = (setStatus) => {
            setStatus('loading');
            emptyPlayer(injectDOM);
            chrome.runtime.sendMessage({
                searchVinyl: vinyl
            }, {}, (playlist) => {
                if (!playlist) {
                    setStatus('error')
                } else {
                    setStatus(null);
                    renderPlayer(injectDOM, playlist, vinylCover)
                }
            });
        };
        ReactDOM.render(
            <PlayButton handlePlay={handlePlay}/>,
            playButtomDom
        );
    });

}
