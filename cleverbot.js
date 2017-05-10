/* CODE PART 1: execute on cleverbot.com to enable constant voice input */

var utter = new SpeechSynthesisUtterance("Hello");

cleverbot.typeReply = function() {
     cleverbot.botreplyelement.innerHTML = cleverbot.reply;
     
     speechSynthesis.cancel();
     utter.text = cleverbot.reply;
     utter.rate = 0.8;
     utter.pitch = 0.95;
     speechSynthesis.speak(utter);

     cleverbot.typeReplyDone();
     cleverbot.asr.request();
};

cleverbot.asr.request = function (i) {
     if (cleverbot.aistate > 0 || cleverbot.asr.mystate == 2) {return}
     cleverbot.asr.mystate = 1;
     setTimeout(cleverbot.asr.useralert, i ? 10000 : 7000);
     document.getElementById("asrmic").src = "/images/avatar/microphone-request.png";
     cleverbot.asr.start();
};

cleverbot.asr.onend = function() {
     if (cleverbot.asr.mystate == 0 || cleverbot.asr.mystate == 2) {
          // cleverbot.showAlert(cleverbot.getTextString("asrerror"));
     }
     document.getElementById("asrmic").src = "/images/avatar/microphone-ready.png";
     if (cleverbot.asr.mystate != 4 && cleverbot.languageselectelement) {
          cleverbot.languageselectelement.className = "";
     }
     cleverbot.asr.mystate = 0;
     
     cleverbot.asr.request();
};

cleverbot.asr.onresult = function(m) {
     var i = cleverbot.stimuluselement;
     if (m && m.results && m.results[0] && m.results[0][0] && m.results[0][0].transcript) {
          i.value = m.results[0][0].transcript;
          speechSynthesis.cancel();
          utter.text = m.results[0][0].transcript;
          utter.rate = 0.8;
          utter.pitch = 0.6;
          speechSynthesis.speak(utter);
          setTimeout(function(){cleverbot.sendAI()}, 4000);
     }
     cleverbot.asr.mystate = 3;
     if (cleverbot.languageselectelement) {
          cleverbot.languageselectelement.className = "";
     }
     cleverbot.asrlanguage = cleverbot.asr.lang;
};

/* CODE PART 2: execute on cleverbot.com to enable AI rambling */

var utter = new SpeechSynthesisUtterance("Hello world! Let's start chatting.");
// var utter2 = new SpeechSynthesisUtterance("Hello");
var alternate = true;

utter.onend = function() {
     setTimeout(function(){cleverbot.sendAI("{pass}")}, (Math.random() * 2000) + 1000);
};

cleverbot.typeReply = function() {
     cleverbot.botreplyelement.innerHTML = cleverbot.reply;
     
     alternate = !alternate;
     
     speechSynthesis.cancel();
     utter.text = cleverbot.reply;
     utter.rate = alternate ? 0.8 : 0.7;
     utter.pitch = alternate ? 0.95 : 0.6;
     speechSynthesis.speak(utter);

     cleverbot.typeReplyDone();
};
