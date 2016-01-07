// content.js

var isThereNoSrc;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {     // listens for messages
  console.log("message listener activated");
  if (request.name === "grabInfo") {
    console.log("request.name equals grabInfo");
    var song = document.getElementsByClassName("songTitle")[0].innerHTML;
    var artist = document.getElementsByClassName("artistSummary")[0].innerHTML;
    var album = document.getElementsByClassName("albumTitle")[0].innerHTML;
    var art = document.getElementsByClassName("art");
    if (song !== undefined && artist !== undefined && album !== undefined && art[1].src !== undefined) {     // checks to see if all the required info is present
      for (var i = art.length - 1; i > 0; i--) {     // runs through art[] looking for elements with no src attributes (excluding art[0])
        console.log("");
        if (art[i].src === undefined) {
          console.log("\"%s\" by %s on the album %s. Please refresh the page and run again to get album art.", song, artist, album);
          var isThereNoSrc = false;
          break;
        }
      }
      if (isThereNoSrc === false) {
        console.log("\"%s\" by %s on the album %s \(%s\).", song, artist, album, art[1].src);     // expected result
      }
    } else { console.log("Not all the information is present or valid."); }
  }
});