// content.js

var port = chrome.runtime.connect({name:"messagePass"});
port.onMessage.addListener(function(message,sender) {
  console.log("added listener for port");
  if(message.status === "buttonClicked"){
    var song = document.getElementsByClassName("songTitle")[0].innerHTML;
    var artist = document.getElementsByClassName("artistSummary")[0].innerHTML;
    var album = document.getElementsByClassName("albumTitle")[0].innerHTML;
    var art = document.getElementsByClassName("art")
    if (art[2].src !== "") {
      console.log('"%s" by %s on the album %s (%s).', song, artist, album, art[1].src);
    } else {
      console.log('"%s" by %s on the album %s. Please refresh the page and run again to get album art.', song, artist, album);
    }
  }
});