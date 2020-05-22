import searchVinyl from "./searchVinyl";

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.searchVinyl) {

        searchVinyl(
            request.searchVinyl.title,
            request.searchVinyl.artist,
            request.searchVinyl.label,
        ).then(result => {
             sendResponse(result);
        }).catch(error => {
            sendResponse(null);
        });

        // Allow async response
        return true;
    }
});

// Hardwax fix play audio
chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
    return {
        requestHeaders: details.requestHeaders.filter(header => header.name !== 'Referer')
    };
}, {urls: ["https://media.hardwax.com/*"]}, ["blocking", "requestHeaders", "extraHeaders"]);
