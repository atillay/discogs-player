const domains = [
    'www.decks.de',
    // 'hardwax.com',
    //'www.deejay.de',
];

/**
 * @param title
 * @param artist
 * @param label
 * @returns {Promise<null|void>}
 */
const searchVinyl = (title, artist, label) => {
    return new Promise((resolve, reject) => {

        // TODO : search also on label ?
        const search = `${artist} ${title}`;

        const query = `${search} (${domains.map(d => 'site:' + d).join(' OR ')})`;
        const resultsPerPage = 3;

        fetch(`https://www.google.com/search?num=${resultsPerPage}&q=${query}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16'
            }
        }).then(res => res.text()).then(body => {

            const regex = new RegExp(`<a href="https:\\/\\/(${domains.join('|')})\\/([^\\s]+)"`, 'g');
            const results = body.matchAll(regex);
            if (results) {
                const urls = Array.from(results).map(match => match[0].split('"')[1]);

                if (!urls.length) {
                    return reject(null);
                }

                // For the moment only handle first result
                const domain = domains.find(d => urls[0].indexOf(d) !== -1);
                if (domain === 'www.decks.de') {
                    extractPlaylistDecksDe(urls[0])
                        .then(playlist => {
                            resolve(playlist)
                        })
                        .catch(() => reject(null));
                }
            }

        }).catch(() => {
            reject(null)
        });
    });
};

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
            : urlParts[urlParts.length-2]

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

/**
 * @param url
 * @returns {Promise<void>}
 */
const extractPlaylistHardwax = (url) => {
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

export default searchVinyl;