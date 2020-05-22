# discogs-player

**Work In Progress, suggestions and PR are welcome**

This Google Chrome extension adds a listen button next to each marketplace track. If the vinyl is found in one the supported sources, a player will appear with the vinyl tracks audio previews.

![](screenshot.jpg?raw=true)

Current supported sources are :
- [www.decks.de]()
- [www.deejay.de]()
- [hardwax.com]()
- [www.hhv.de]()

## Usage
- `$ npm install & npm run build`
- Open Google Chrome and "Load unpacked" extension
- Visit [https://www.discogs.com/sell/list?style=Techno]() (for example)

## How it works
1. Extract each vinyl information from the Discogs results page
2. Build a google search query with vinyl meta and restricted domains (using Dorks syntax)
3. Extract the search result and retrive vinyl playlist from the correct source
4. Display the audio player with the loaded playlist
