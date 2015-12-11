//background.js

var port = chrome.runtime.connect({name: "pass"});
chrome.browserAction.onClicked.addListener( function(){
  chrome.runtime.sendMessage({info:"buttonClicked"})
});
chrome.runtime.onMessage.addListener(function(songInfo) {
  if (songInfo.status == "sendInfo") {
    console.log(songInfo.url + " __ " + songInfo.song + " __ " + songInfo.artist + " __ " + songInfo.album)
  }
})