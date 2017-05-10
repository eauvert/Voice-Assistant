var halt = false;
var feedback = new Audio();
feedback.src = "https://www.soundjay.com/misc/sounds/small-bell-ring-01a.mp3";
var recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
recognition = new recognition();
recognition.lang = "en-US";
recognition.interimResults = false;

function onResult(event){
     var result = event.results[0][0].transcript;
     if (result.toUpperCase().match("OKAY") && result.toUpperCase().match("GOOGLE")){
          feedback.play();
          document.body.getElementsByClassName("gsst_a")[0].click();
          halt = true;
          setTimeout(function(){halt = false; feedback.play(); recognition.start()}, 13000);
     }
}

function onEnd(event){
     setTimeout(function(){if (!halt){recognition.start()}}, 1000);
}

function onClick(event){
     document.body.removeChild(this);
     recognition.start();
}

var button = document.createElement("input");
button.type = "button";
button.value = "Start";
button.style.position = "fixed";
document.body.appendChild(button);
document.body.appendChild(feedback);
button.addEventListener("click", onClick);
recognition.onresult = onResult;
recognition.onend = onEnd;
