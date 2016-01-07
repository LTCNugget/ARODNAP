// content.js

var areAllSrcPresent = true;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {     // listens for messages
  if (request.name === "grabInfo") {
    if (song !== undefined && artist !== undefined && album !== undefined && art[1].src !== undefined) {     // checks to see if all the required info is present
      var song = document.getElementsByClassName("songTitle")[0].innerHTML;
      var artist = document.getElementsByClassName("artistSummary")[0].innerHTML;
      var album = document.getElementsByClassName("albumTitle")[0].innerHTML;
      var art = document.getElementsByClassName("art");
      for (var i = art.length - 1; i > 0; i--) {     // runs through art[] looking for elements with no src attributes (excluding art[0])
        if (art[i].src === "") {
          console.log("\"%s\" by %s on the album %s.", song, artist, album);
          console.error("Album art not listed: Could not be found");
          areAllSrcPresent = false;
          break;
        }
      }
      if (areAllSrcPresent === true) { console.log("\"%s\" by %s on the album %s \(%s\).", song, artist, album, art[1].src); }     // perfect result
    } else { console.error("Not all the information is present or valid."); }
  }
});