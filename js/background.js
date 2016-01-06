//background.js

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.runtime.onConnect.addListener(function(port){
    port.postMessage({status:"buttonClicked"});
    console.log("posted status buttonClicked");
  });
});