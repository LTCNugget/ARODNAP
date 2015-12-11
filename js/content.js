// content.js

var port = chrome.runtime.connect({name: "pass"});
chrome.runtime.onMessage.addListener(function(stat) {
  if (stat.info == "buttonClicked") {
    artLoca = $(".art").length - 1;
    console.log( $( $( ".art" )[0]).attr("src") + " was at " + artLoca);
    var currArt = $(".art")
    console.log(currArt[1].attr("src"))
    chrome.runtime.sendMessage({
      "status": "sendInfo",
      "url": $($(".art")[artLoca]).attr("src"),
      "song": $($(".songTitle")[0]).innerText,
      "artist": $($(".artistSummary")[0]).innerText,
      "album": $($(".albumTitle")[0]).innerText
    });
  }
});