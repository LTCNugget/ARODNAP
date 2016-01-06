// content.js

var port = chrome.runtime.connect({name: "sendInfo"});

function testFunction() {
  console.log("testFunction worked");
}

// Listens for port message to start
port.onMessage.addListener(function(stat) {
  console.log("content.js listener 1 activated");
  // Sends all info if status is correct
  if (stat.status == "buttonClicked") {
    console.log("stat.status == buttonClicked");
    port.postMessage({
      "status": "sendInfo",
      "url": $( $(".art")[1] ).src,
      "song": $($(".songTitle")[0]).innerText,
      "artist": $($(".artistSummary")[0]).innerText,
      "album": $($(".albumTitle")[0]).innerText
    });
  }
});


/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.sendInfo == "buttonClicked") {
    sendResponse({
      "status": "sendInfo",
      "url": $( $(".art")[1] ).src,
      "song": $($(".songTitle")[0]).innerText,
      "artist": $($(".artistSummary")[0]).innerText,
      "album": $($(".albumTitle")[0]).innerText
    });
  }
});
*/