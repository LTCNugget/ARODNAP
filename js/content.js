// content.js

var art = "";
var whereIs2ndNoSrc = "";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {     // listens for messages
  if ( request.name === "grabInfo" ) {
    if ( $(".songTitle") !== null && $(".artistSummary") !== null && $(".albumTitle") !== null && $(".art") !== null ) {     // checks to see if all the required info is present
      for (var i = 1; i <= $(".art").length - 1; i++) { if ( $(".art")[i].src === "" ) { whereIs2ndNoSrc = i; } }
      if (whereIs2ndNoSrc !== "") { for (var i = whereIs2ndNoSrc - 1; i >= 0; i--) {
        $( $(".art")[i].remove() );
        var whereIs2ndNoSrc = ""; } }
      var art = $(".art")[1].src
      console.log("\"%s\" by %s on the album %s \(%s\).", $(".songTitle")[0].innerHTML, $(".artistSummary")[0].innerHTML, $(".albumTitle")[0].innerHTML, art);     // expected result
      var art = "";
      $( $(".art")[1].remove() );
    } else { console.error("Not all the information is present or valid."); }
  }
});