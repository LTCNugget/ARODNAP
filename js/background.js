//background.js

var songInfo = {};

chrome.browserAction.onClicked.addListener( function() {     // listens for a click on the extension icon
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {name: "grabInfo"});     // sends the activating message
  });
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting === "CTtoBG") {
    songInfo.song = request.song; songInfo.artist = request.artist; songInfo.album = request.album; songInfo.art = request.url;
  } else if (request.greeting === "DTtoBG") { songInfo.file = request.sngfile; }
});
function toPhp() {
  songInfo.art = songInfo.art.replace(new RegExp("&", "g"), "δ"); songInfo.file = songInfo.file.replace(new RegExp("&", "g"), "δ");
  var phpUrl = "http://localhost:8000/main.php?song=" + songInfo.song + "&artist=" + songInfo.artist + "&album=" + songInfo.album +
    "&albumart=" + songInfo.art + "&songfile=" + songInfo.file;
  phpUrl = encodeURI(phpUrl);
  chrome.tabs.create({ url: phpUrl });
  return phpUrl
}
