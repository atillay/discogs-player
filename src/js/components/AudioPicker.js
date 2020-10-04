import React, {useState} from "react";

const AudioPicker = ({playlist, currentAudioIndex, handleChangeAudio}) => {

    const [showPlaylist, setShowPlaylist] = useState(false);

    return (
        <div className="audio-picker">
            <div className="audio-picker-toggle-wrapper">
                <div className="audio-picker-toggle"
                     onClick={() => setShowPlaylist(!showPlaylist)}
                     onMouseEnter={() => setShowPlaylist(true)}
                >
                    <svg viewBox="0 0 846.66 846.66" fillRule="evenodd" clipRule="evenodd">
                        <path d="M269.34 116.46h539.63v83.02H269.34v-83.02zM191.1 701.55L59.83 777.34c-9.9 5.73-22.12-1.57-22.11-12.74l-.03-151.77c0-11.93 13.36-18.75 23-12.24l130.57 75.38c9.96 5.77 9.64 20.09-.16 25.58zm78.24-54.35h539.63v83.02H269.34V647.2zM191.1 436.18L59.83 511.97c-9.9 5.74-22.12-1.56-22.11-12.74l-.03-151.76c0-11.94 13.36-18.75 23-12.24l130.57 75.38c9.96 5.77 9.64 20.09-.16 25.57zm78.24-54.35h539.63v83.02H269.34v-83.02zM191.1 170.82L59.83 246.6c-9.9 5.74-22.12-1.56-22.11-12.73L37.69 82.1c0-11.93 13.36-18.75 23-12.24l130.57 75.38c9.96 5.77 9.64 20.09-.16 25.58z" />
                    </svg>
                </div>
                <div className="audio-picker-toggle-count">
                    {currentAudioIndex+1}/{playlist.length}
                </div>
            </div>
            {showPlaylist && (
                <ul className="audio-picker-list" onMouseLeave={() => setShowPlaylist(false)}>
                    {playlist.map((audio, index) => (
                        <li onClick={() => {handleChangeAudio(index); setShowPlaylist(false)}} key={index}>
                            <div>
                                <svg viewBox="0 0 100 100">
                                    <path d="M50 12c-20.987 0-38 17.013-38 38s17.013 38 38 38 38-17.013 38-38-17.013-38-38-38zM39 32l30 18-30 18z" overflow="visible"/>
                                </svg>
                            </div>
                            <div>
                                {index+1} -  {audio.title}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
};

export default AudioPicker;
