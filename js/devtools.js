// devtools.js

// sorts through network requests and send the url's of audio files to background.js
chrome.devtools.network.onRequestFinished.addListener(function(entry) {
  if (entry.response.content.mimeType === "audio/mp4") {
    chrome.runtime.sendMessage({ greeting: "DTtoBG", sngfile: entry.request.url });
  }
});
