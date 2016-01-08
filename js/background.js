//background.js

chrome.browserAction.onClicked.addListener(function() {     // listens for a click on the extension icon
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {name: "grabInfo"}, function(response) {});     // sends the activating message
  });
});