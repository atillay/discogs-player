import React, {useState} from "react";
import Rhap from "react-h5-audio-player";
import AudioPicker from "./AudioPicker";

delete window.document.referrer;

const AudioPlayer = ({playlist = [], vinylMeta = {}}) => {

    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);

    return (
        <div className="audio-player-main">
            <div className="audio-player-container">
                <div className="audio-playlist">
                    <div className="audio-cover">
                        {vinylMeta.cover ? (
                            <img src={vinylMeta.cover} alt="audio image"/>
                        ) : (
                            <svg viewBox="0 0 847 1058.75" fillRule="evenodd" clipRule="evenodd">
                                <path className="fill-path" d="M371 401c6-14 17-25 31-31 13-5 29-6 43 1 15 6 26 17 31 31 6 13 6 29 0 43-6 15-17 26-31 31-13 6-29 6-44 0-14-6-25-17-31-31-5-13-6-29 1-44zm41-5v1c-7 2-12 8-15 15-4 8-3 16 0 22 2 7 8 13 15 16 8 3 16 3 22 0 7-3 13-8 16-16 3-7 3-15 0-22s-8-12-15-15c-8-4-16-3-23-1z"/>
                                <path className="fill-path" d="M40 264C84 158 167 80 265 40c99-41 212-44 318 0s184 127 224 225c40 99 43 212-1 318S679 767 581 807s-212 43-317-1C158 762 80 679 40 581c-41-98-44-212 0-317zm248 103l-86-56-117-75c-22 40-37 83-44 128l136 16 103 13c2-9 5-18 8-26zm14-25c1-3 3-5 5-7L105 203l-6 9 118 75 85 55zm264 112c-1 9-4 17-8 26l87 55 117 76c7-13 13-26 18-39 13-30 21-60 26-90l-136-16-104-12zm-21 51c-2 2-3 4-5 6l201 132c2-2 4-5 6-8l-118-76-84-54zM378 314c-28 12-51 34-64 64-12 30-11 62 0 90 12 28 34 52 64 64 30 13 62 12 90 1 28-12 52-34 64-64 13-30 12-63 1-91-12-28-34-51-64-64-30-12-63-11-91 0z"/>
                            </svg>
                        )}
                    </div>
                    <div className="audio-informations">
                        <div>{playlist[currentAudioIndex].title}</div>
                        <div>{playlist[currentAudioIndex].title.indexOf(vinylMeta.artist) === -1 && vinylMeta.artist}</div>
                    </div>
                </div>
                <Rhap
                    autoPlay={true}
                    src={playlist[currentAudioIndex].src}
                    onClickNext={() => setCurrentAudioIndex(currentAudioIndex < playlist.length-1 ? currentAudioIndex+1 : 0)}
                    onClickPrevious={() => setCurrentAudioIndex(currentAudioIndex > 0 ? currentAudioIndex-1 : playlist.length-1)}
                    onEnded={() => setCurrentAudioIndex(currentAudioIndex < playlist.length-1 ? currentAudioIndex+1 : 0)}
                    layout="stacked-reverse"
                    showSkipControls={true}
                    showJumpControls={false}
                    customAdditionalControls={[
                        <AudioPicker
                            playlist={playlist}
                            currentAudioIndex={currentAudioIndex}
                            handleChangeAudio={(index) => setCurrentAudioIndex(index)}
                        />
                    ]}
                />
            </div>
        </div>
    )
};

export default AudioPlayer