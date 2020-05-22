/**
 * @param url
 * @returns {Promise<void>}
 */
const extractPlaylistHhvDe = (url) => {
    return new Promise((resolve, reject) => {

        const urlParts = url.split("-");

        // Not a track page
        if (!urlParts.length || isNaN((urlParts[urlParts.length-1]))) {
            return reject(null);
        }

        const vinylId = urlParts[urlParts.length-1];

        fetch(`https://www.hhv.de/shop/ajax/player/for_item/${vinylId}`)
            .then(res => res.json())
            .then((data) => {
                const playlist = data.tracks.map((track) => ({
                    title: track.name,
                    src: track.mp3path
                }));
                resolve(playlist);
            }).catch(() => {
            reject(null);
        })
    });
};

export default extractPlaylistHhvDe;