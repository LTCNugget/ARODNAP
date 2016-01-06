//background.js

// Sends message when the extension button is clicked
chrome.browserAction.onClicked.addListener(function() {
  console.log("button clicked");
  chrome.runtime.onConnect.addListener(function(port) {
    console.log("background.js listener 1 activated");
    console.assert(port.name == "sendInfo");
    port.postMessage({status: "buttonClicked"});
    // Logs the response as a string in console if the message is correct
    port.onMessage.addListener(function(msg) {
      console.log("background.js listener 1 activated");
      if (msg.status == "sendInfo") {
        console.log("msg.status == sendInfo");
        console.log("The song is %s by %s on the album %s located at %s", msg.song, msg.artist, msg.album, msg.url)
      }
    });
  });
});


/*
chrome.browserAction.onClicked.addListener(function(request, sender, sendResponse) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.runtime.sendMessage(tabs[0].id, {sendInfo:"buttonClicked"}, function(response) {
      console.log(response.url + " __ " + response.song + " __ " + response.artist + " __ " + response.album)
    });
  });
});
*/