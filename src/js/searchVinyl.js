import extractPlaylistHhvDe from "./search-vinyl/extractPlaylistHhvDe";
import extractPlaylistDeejayDe from "./search-vinyl/extractPlaylistDeejayDe";
import extractPlaylistDecksDe from "./search-vinyl/extractPlaylistDecksDe";
import extractPlaylistHardwaxCom from "./search-vinyl/extractPlaylistHardwaxCom";

const sources = [
    'www.decks.de',
    'www.deejay.de',
    'hardwax.com',
    'www.hhv.de'
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

        const query = `${search} (${sources.map(d => 'site:' + d).join(' OR ')})`;
        const resultsPerPage = 3;

        fetch(`https://www.google.com/search?num=${resultsPerPage}&q=${encodeURIComponent(query)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16'
            }
        }).then(res => res.text()).then(body => {

            const regex = new RegExp(`<a href="https:\\/\\/(${sources.join('|')})\\/([^\\s]+)"`, 'g');
            const results = body.matchAll(regex);
            if (results) {
                const urls = Array.from(results).map(match => match[0].split('"')[1]);
                if (!urls.length) {
                    return reject(null);
                }

                // TODO : handle second and third result
                const source = sources.find(d => urls[0].indexOf(d) !== -1);
                switch (source) {
                    case 'www.decks.de':
                        extractPlaylistDecksDe(urls[0])
                            .then(playlist => resolve(playlist))
                            .catch(() => reject(null));
                        break;
                    case 'www.deejay.de':
                        extractPlaylistDeejayDe(urls[0])
                            .then(playlist => resolve(playlist))
                            .catch(() => reject(null));
                        break;
                    case 'www.hhv.de':
                        extractPlaylistHhvDe(urls[0])
                            .then(playlist => resolve(playlist))
                            .catch(() => reject(null));
                        break;
                    case 'hardwax.com':
                        extractPlaylistHardwaxCom(urls[0])
                            .then(playlist => resolve(playlist))
                            .catch(() => reject(null));
                        break;
                    default:
                        reject(null);
                }
            }

        }).catch(() => {
            reject(null)
        });
    });
};

export default searchVinyl;