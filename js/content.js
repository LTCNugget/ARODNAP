// content.js - gets music data and sends it back to the background script

// checks to make sure the website is pandora
if ( window.location.href.slice(11, 22) === "pandora.com" ) {
  var art = "";
  var whereIs2ndNoSrc = "";
  // fixes the order of the art
  function correctArt() {
    for (var i = 1; i <= $(".art").length - 1; i++) { if ( $(".art")[i].src === "" ) { whereIs2ndNoSrc = i; } }
    if (whereIs2ndNoSrc !== "") { for (var i = whereIs2ndNoSrc - 1; i >= 0; i--) { $( $(".art")[i].remove() ); whereIs2ndNoSrc = ""; } }
    for (var i = 2; i <= $(".art").length - 1; i++) { $( $(".art")[i].remove() ); }
  }
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting === "gatherAndRespond") {
      correctArt();
      var art = $(".art")[1].src;
      chrome.runtime.sendMessage({
        greeting: "CTtoBG", song:$(".songTitle")[0].innerText, artist:$(".artistSummary")[0].innerText,
        album:$(".albumTitle")[0].innerText, url:$(".art")[1].src
      });
      art = ""; $( $(".art")[1].remove() );
    }
  });
} else { console.error("Website is not pandora.com"); }