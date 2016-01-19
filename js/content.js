// content.js

var art = "";
var whereIs2ndNoSrc = "";
var placeholder = "Not there yet...";
var infoHtml = '<div class="item arodnapInfo" style="display: block;"><div class="close1"></div><div class="heading">Arodnap Info</div><div class="itemContent"><p class="arodnapInfo"></p><p class="arodnapInfo"></p><p class="arodnapInfo"></p><p class="arodnapInfo"></p></div><div class="divider last"></div></div>';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {     // listens for messages
  if ( request.name === "grabInfo" ) {
    if ( window.location.href.slice(11, 22) === "pandora.com" ) {
      if ( $(".songTitle") !== undefined && $(".artistSummary") !== undefined && $(".albumTitle") !== undefined && $(".art")[1] !== undefined ) {     // checks to see if all the required info is present
        for (var i = 1; i <= $(".art").length - 1; i++) { if ( $(".art")[i].src === "" ) { whereIs2ndNoSrc = i; } }
        if (whereIs2ndNoSrc !== "") { for (var i = whereIs2ndNoSrc - 1; i >= 0; i--) { $( $(".art")[i].remove() ); var whereIs2ndNoSrc = ""; } }
        for (var i = 2; i <= $(".art").length - 1; i++) { $( $(".art")[i].remove() );}
        var art = $(".art")[1].src;
        console.log("\"%s\" by %s on the album %s \(%s\).", $(".songTitle")[0].innerHTML, $(".artistSummary")[0].innerHTML, $(".albumTitle")[0].innerHTML, art);
        var whereIsDivider = $("div.item.relatedArtists > div.divider").length - 1;
        if ($("div.item.relatedArtists > div.divider")[whereIsDivider].className !== "divider") { $("div.item.relatedArtists > div.divider.last")[0].className = "divider" }
        $("div#trackDetail").append(infoHtml); $("p.arodnapInfo")[0].innerText = "Song: " + $(".songTitle")[0].innerText;
        $("p.arodnapInfo")[1].innerText = "Artist: " + $(".artistSummary")[0].innerText; $("p.arodnapInfo")[2].innerHTML = "Album: <a href=" + art + ">" + $(".albumTitle")[0].innerText + "</a>";
        $("p.arodnapInfo")[3].innerText = "File: " + placeholder; art = ""; $( $(".art")[1].remove() );
      } else { console.error("Not all the information is present or valid."); }
    } else { console.error("Website is not pandora.com"); } } });