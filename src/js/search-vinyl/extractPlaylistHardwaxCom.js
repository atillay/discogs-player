/**
 * @param url
 * @returns {Promise<void>}
 */
const extractPlaylistHardwaxCom = (url) => {
    return new Promise((resolve, reject) => {

        fetch(url)
            .then(res => res.text())
            .then((html) => {
                const parser = new DOMParser();
                const page = parser.parseFromString(html, "text/html");

                const tracks = [...page.querySelectorAll('#tracklisting a')];
                const playlist = tracks
                    .map(domTrack => ({
                        title: domTrack.getAttribute('title'),
                        src: domTrack.getAttribute('href') // TODO : fix audio url redirecting (referer suspected)
                    }));
                resolve(playlist);

            }).catch(() => {
            reject(null);
        })
    });
};

export default extractPlaylistHardwaxCom;