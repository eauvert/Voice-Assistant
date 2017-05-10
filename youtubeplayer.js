var halt = false;
var feedback = new Audio();
feedback.src = "https://www.soundjay.com/misc/sounds/small-bell-ring-01a.mp3";
feedback.load();
var service = "MUSIC";
var recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
recognition = new recognition();
recognition.lang = "en-US";
recognition.interimResults = false;
var search = false;

function playMusic(){
     try {document.getElementsByClassName("_mbw")[0].click()}
     catch (e) {}
     try {document.getElementsByTagName("video")[0].play()}
     catch (e) {}
}

function onResult(event){
     var result = event.results[0][0].transcript;
     if (search){
          search = false;
          document.body.style.backgroundColor = "#000000";
          /* mobile */
          document.getElementsByClassName("_mtrb")[0].value = result;
          document.getElementsByClassName("_mnrb")[0].click();
          setTimeout(function(){
               try {document.querySelectorAll("a[href*=watch]")[0].click()}
               catch (e) {}
               playMusic();
          }, 4000);
     }
     else if (result.toUpperCase().match("STOP") && result.toUpperCase().match("MUSIC")){
          /* window.history.back(); */
          try {document.getElementsByTagName("video")[0].pause()}
          catch (e) {}
     }
     else if (result.toUpperCase().match("PLAY") && result.toUpperCase().match("MUSIC")){
          playMusic();
     }
     else if (result.toUpperCase().match("MAX") && result.toUpperCase().match("VOLUME")){
          try {document.getElementsByTagName("video")[0].volume = 1}
          catch (e) {}
     }
     else if (result.toUpperCase().match("MEDIUM") && result.toUpperCase().match("VOLUME")){
          try {document.getElementsByTagName("video")[0].volume = 0.5}
          catch (e) {}
     }
     else if (result.toUpperCase().match("LOW") && result.toUpperCase().match("VOLUME")){
          try {document.getElementsByTagName("video")[0].volume = Math.random() * 0.3}
          catch (e) {}
     }
     else if (result.toUpperCase().match("OKAY") && result.toUpperCase().match("MUSIC")){
          feedback.play();
          search = true;
          document.body.style.backgroundColor = "#FFFFFF";
     }
}

function onEnd(event){
     recognition.start();
}

function onClick(event){
     feedback.play();
     document.body.style.backgroundColor = "#000000";
     var div = document.getElementsByTagName("div");
     for (var i = 0; i < div.length; i++){div[i].style.display = "none"};
     document.body.removeChild(this);
     recognition.start();
}

var button = document.createElement("input");
button.type = "button";
button.value = "Start";
button.style.position = "fixed";
button.style.top = 0;
document.body.appendChild(button);
var bump = document.createElement("input");
bump.style.position = "absolute";
bump.style.top = "1024px";
document.body.appendChild(bump);
button.addEventListener("click", onClick);
recognition.onresult = onResult;
recognition.onend = onEnd;
