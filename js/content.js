// content.js

var areAllSrcPresent = true;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {     // listens for messages
  if ( request.name === "grabInfo" ) {
    if ( $(".art")[0].src === "" ) { $( $(".art")[0].remove() ); }
    if ( $(".songTitle") !== null && $(".artistSummary") !== null && $(".albumTitle") !== null && $(".art") !== null ) {     // checks to see if all the required info is present
      for ( var i = $(".art").length - 1; i >= 0; i-- ) { if ( $(".art")[i].src === "" ) { areAllSrcPresent = false; } }     // runs through $(".art") looking for elements with no src attributes
      if ( areAllSrcPresent === true ) { console.log("\"%s\" by %s on the album %s \(%s\).", $(".songTitle")[0].innerHTML, $(".artistSummary")[0].innerHTML, $(".albumTitle")[0].innerHTML, $(".art")[0].src); }     // perfect result
      else if ( areAllSrcPresent === false ) {
        $( $(".art")[0].remove() );
        console.log("\"%s\" by %s on the album %s \(%s\).", $(".songTitle")[0].innerHTML, $(".artistSummary")[0].innerHTML, $(".albumTitle")[0].innerHTML, $(".art")[0].src);
        $( $(".art")[0].remove() );
      }
    } else { console.error("Not all the information is present or valid."); }
  }
});