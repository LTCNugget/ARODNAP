// content.js

var art = "";
var whereIs2ndNoSrc = "";
var placeholder = "Not there yet...";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {     // listens for messages
  if ( request.name === "grabInfo" ) {
    if ( window.location.href.slice(11, 22) === "pandora.com" ) {
      if ( $(".songTitle") !== undefined && $(".artistSummary") !== undefined && $(".albumTitle") !== undefined && $(".art")[1] !== undefined ) {     // checks to see if all the required info is present
        for (var i = 1; i <= $(".art").length - 1; i++) { if ( $(".art")[i].src === "" ) { whereIs2ndNoSrc = i; } }
        if (whereIs2ndNoSrc !== "") { for (var i = whereIs2ndNoSrc - 1; i >= 0; i--) { $( $(".art")[i].remove() ); var whereIs2ndNoSrc = ""; } }
        for (var i = 2; i <= $(".art").length - 1; i++) { $( $(".art")[i].remove() );}
        var art = $(".art")[1].src;
        console.log("\"%s\" by %s on the album %s \(%s\).", $(".songTitle")[0].innerHTML, $(".artistSummary")[0].innerHTML, $(".albumTitle")[0].innerHTML, art);     // expected result
        $(".heading")[6].innerText = "arodnapHeading"; var infoBox = $(".getRelatedArtist")
        if ( infoBox.length !== 4 ) { for (var i = infoBox.length; i <= 4; i++) {  } }
        infoBox[0].innerText = "Song Title: " + $(".songTitle")[0].innerHTML; infoBox[1].innerText = "Artist: " + $(".artistSummary")[0].innerHTML;
        infoBox[2].innerText = "Album (cover): " + $(".albumTitle")[0].innerHTML + "(" + art + ")"; infoBox[3].innerText = "Song file: " + placeholder;
        for (var i = 3; i <= 0; i--) { $(".getRelatedArtist")[i].href = undefined; }
        infoBox[3].href = art;
        art = ""; $( $(".art")[1].remove() );
      } else { console.error("Not all the information is present or valid."); }
    } else { console.error("Website is not pandora.com"); } } });
