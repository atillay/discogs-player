/**
 * @param url
 * @returns {Promise<void>}
 */
const extractPlaylistDeejayDe = (url) => {
    return new Promise((resolve, reject) => {

        const urlParts = url.split("__");
        if (!urlParts.length ) {
            return reject(null);
        }
        const vinylId = urlParts[urlParts.length-1].split('/')[0];
        if (isNaN(vinylId)) {
            return reject(null);
        }

        fetch(`https://www.deejay.de/ajaxHelper/fp.php?t=${vinylId}`)
            .then(res => res.text())
            .then((data) => {
                let playlist = [];

                // INSPIRED FROM completeHandler() in deejay.de JS script
                let dataArray = data.split("~");
                if (dataArray[1] === "noprevtrack" || dataArray[1] === "endofplaylist") {
                    reject(null);
                }
                let plArtikelNumber = dataArray[1];

                for (let idx = 7; idx < dataArray.length; idx++) {
                    let trackArray = dataArray[idx].split("\\");
                    if (trackArray.length < 3) {
                        break;
                    }
                    const src = `https://www.deejay.de/streamit/${plArtikelNumber.substr(plArtikelNumber.length - 2, 1)}/${plArtikelNumber.substr(plArtikelNumber.length - 1, 1)}/${plArtikelNumber + trackArray[0]}.mp3`;
                    const title  = trackArray[2].indexOf("|") !== -1
                        ? (trackArray[2]).substring(trackArray[2].indexOf("|") + 1).trim()
                        : trackArray[2].trim()

                    playlist.push({
                        title: title,
                        src: src
                    })
                }

                return !playlist.length ? reject(null) : resolve(playlist);
            }).catch(() => {
            reject(null);
        })
    });
};

export default extractPlaylistDeejayDe;