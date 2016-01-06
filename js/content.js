// content.js

var port = chrome.runtime.connect({name:"messagePass"});
port.onMessage.addListener(function(message,sender){
  console.log("added listener for port");
  if(message.status === "buttonClicked"){
    var artist = document.getElementsByClassName("artistSummary")[0].innerHTML;
    console.log("Song: %s; Album: %s; Artist: %s;", "", "", artist);
  }
});