/**
 * @param url
 * @returns {Promise<void>}
 */
const extractPlaylistDecksDe = (url) => {
    return new Promise((resolve, reject) => {

        // Not a track page
        if (url.indexOf('/track/') === -1) {
            return reject(null);
        }

        const urlParts = url.split("/");
        const vinylId = urlParts[urlParts.length-1].length > 4
            ? urlParts[urlParts.length-1]
            : urlParts[urlParts.length-2];

        fetch(`https://www.decks.de/decks/rpc/getAudio.php?id=${vinylId}`)
            .then(res => res.json())
            .then((data) => {
                const playlist = data.track.map((name, key) => ({
                    title: name,
                    src: data.sound[key]
                }));
                resolve(playlist);
            }).catch(() => {
            reject(null);
        })
    });
};

export default extractPlaylistDecksDe;