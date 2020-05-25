# discogs-player

**BETA - Suggestions and PR are welcome**

This Google Chrome extension adds a listen button next to each marketplace track. If the vinyl is found in one the supported sources, a player will appear with the vinyl tracks audio previews.

![](screenshot.jpg?raw=true)

Current supported sources are :
- [www.decks.de](https://www.decks.de)
- [www.deejay.de](https://www.deejay.de)
- [hardwax.com](https://hardwax.com)
- [www.hhv.de](https://www.hhv.de)

## Usage
- `$ npm install & npm run build`
- The unpacked extension will be created in `./extension` folder
- Then open [chrome://extensions](chrome://extensions), enable developer mode and "Load unpacked" extension
- Visit a marketplace page : [https://www.discogs.com/sell/list?style=Techno](https://www.discogs.com/sell/list?style=Techno) (for example)

## How it works
1. Extract each vinyl information from the Discogs results page
2. Build a google search query with vinyl meta and restricted domains (using Dorks syntax)
3. Extract the search result and retrive vinyl playlist from the correct source
4. Display the audio player with the loaded playlist
