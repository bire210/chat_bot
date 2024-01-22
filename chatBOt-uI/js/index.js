var $messages = $(".messages-content");
var serverResponse = "wala";

var suggession;
//speech reco
try {
  var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
} catch (e) {
  console.error(e);
  $(".no-browser-support").show();
}

$("#start-record-btn").on("click", function (e) {
  recognition.start();
});

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
  document.getElementById("MSG").value = speechToText;
  console.log(speechToText);
  insertMessage();
};

function listendom(no) {
  console.log(no);
  console.log(document.getElementById(no));
  document.getElementById("MSG").value = no.innerHTML;
  insertMessage();
}

$(window).load(function () {
  $messages.mCustomScrollbar();
  setTimeout(function () {
    serverMessage("hello, I am customer support Bot. How can I help you ?");
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar("scrollTo", "bottom", {
    scrollInertia: 10,
    timeout: 0,
  });
}

function insertMessage() {
  msg = $(".message-input").val();
  if ($.trim(msg) == "") {
    return false;
  }
  $('<div class="message message-personal">' + msg + "</div>")
    .appendTo($(".mCSB_container"))
    .addClass("new");
  fetchmsg();

  $(".message-input").val(null);
  updateScrollbar();
}

document.getElementById("mymsg").onsubmit = (e) => {
  e.preventDefault();
  insertMessage();
  speechSynthesis.speak(new SpeechSynthesisUtterance("hello"));
};

function serverMessage(response2) {
  if ($(".message-input").val() != "") {
    return false;
  }
  $(
    '<div class="message loading new"><figure class="avatar"><img src="css/bot.png" /></figure><span></span></div>'
  ).appendTo($(".mCSB_container"));
  updateScrollbar();

  setTimeout(function () {
    $(".message.loading").remove();
    $(
      '<div class="message new"><figure class="avatar"><img src="css/bot.png" /></figure>' +
        response2 +
        "</div>"
    )
      .appendTo($(".mCSB_container"))
      .addClass("new");
    updateScrollbar();
  }, 100 + Math.random() * 20 * 100);
}

function fetchmsg() {
  var url = "http://localhost:8000/api/v1/chat-bot/text_query";

  const data = {};
  for (const pair of new FormData(document.getElementById("mymsg"))) {
    data["userText"] = pair[1];
    data["userId"] = "tesj-klhsdfkdhfghg";
  }
  console.log("data *******************88", data);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      serverMessage(response.data.resAns);
      speechSynthesis.speak(new SpeechSynthesisUtterance(response.data.resAns));
    })
    .catch((error) => console.error("Error h:", error));
}
