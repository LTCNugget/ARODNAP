//background.js

chrome.runtime.onConnect.addListener(function(port){
  chrome.browserAction.onClicked.addListener(function(tab) {
    port.postMessage({status:"buttonClicked"});
    console.log("posted status buttonClicked");
  });
});