// background.js - gets info from content and devtools, makes the link, opens it, then closes it

var songInfo = {};
var isReady = { content:false, devtools:false };

// send an object (arg mail) to the content script
function sendToContent(mail) { chrome.tabs.query({active: true}, function(tabs) { chrome.tabs.sendMessage(tabs[0].id, mail); }); }

// listens for responses
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.greeting) {
    // add responses from content to songInfo object and start the php phase
    case "CTtoBG":
      songInfo.song = request.song; songInfo.artist = request.artist; songInfo.album = request.album;
      songInfo.art = request.url; isReady.content = true; openPhp(); break;
    // add file url from devtool script and tell content to gather song data
    case "DTtoBG": songInfo.file = request.sngfile;
      setTimeout(function() { sendToContent({greeting:"gatherAndRespond"}) }, 10000);
      isReady.firstTime = false; isReady.devtools = true; break;
  }
});

chrome.browserAction.onClicked.addListener(function() { if(isReady.content === true && isReady.devtools === true) {
  openPhp(); } else { console.error("can't openPhp(). songInfo.song or songInfo.file is undefined"); }
} )

// puts together url and sends GET request
function openPhp() {
  var phpUrl = "http://24.99.54.140/ARODNAP.php?os=win";
  if (songInfo.art !== undefined) { phpUrl += "&song=" + songInfo.song.replace(new RegExp("&", "g"), "δ"); }
  if (songInfo.artist !== undefined) { phpUrl += "&artist=" + songInfo.artist.replace(new RegExp("&", "g"), "δ"); }
  if (songInfo.album !== undefined) { phpUrl += "&album=" + songInfo.album.replace(new RegExp("&", "g"), "δ"); }
  if (songInfo.art !== undefined) { phpUrl += "&albumart=" + songInfo.art.replace(new RegExp("&", "g"), "δ"); }
  if (songInfo.art !== undefined) { phpUrl += "&songfile=" + songInfo.file.replace(new RegExp("&", "g"), "δ"); }
  phpUrl = encodeURI(phpUrl); isReady.content = false; isReady.devtools = false;
  chrome.tabs.create({ url: phpUrl });
  chrome.tabs.query({ url: "*://24.99.54.140/*" }, function(tabs) { setTimeout(function() { chrome.tabs.remove(tabs[0].id); }, 15000); });
  return phpUrl;
}