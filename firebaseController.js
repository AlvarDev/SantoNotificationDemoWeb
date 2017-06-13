var dbRef;
var data;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCIzjIx6J1hTAlg0AEZT4WKxQhmdlnq-L4",
    authDomain: "santos-digital-demos.firebaseapp.com",
    databaseURL: "https://santos-digital-demos.firebaseio.com",
    projectId: "santos-digital-demos",
    storageBucket: "santos-digital-demos.appspot.com",
    messagingSenderId: "387503652832"
  };

firebase.initializeApp(config);

dbRef = firebase.database().ref().child("notifications");
dbRef.on('value', snap => setMessages(snap.val()));

function send(){
  var now = new Date();
  var id = now.getTime();
  var urlAvatar = 'https://pbs.twimg.com/profile_images/831958905987010560/0pKEhzWj_400x400.jpg';
  var mTitle = $('#typed-title').val();;
  var mMessage = $('#typed-message').val();

  if(mTitle.length > 0 && mMessage.length > 0){
    var notification = {
      idea: id,
      urlAvatar: urlAvatar,
      title: mTitle,
      message: mMessage
    };

    dbRef.child(id).set(notification);
    sendNotification();
  }else{
    alert("Write a title and a message");
  }
}

function sendNotification() {
  
}

function setMessages(messages) {
    /*data = messages;
    var mes = messages.split("\n");
    $("#messages").text("");
    $(".remove").remove();

    var html = "";

    $.each(mes, function(i, item) {
        html += '<div class="remove">' + item + '</div>';
    });

    $("#messages").append(html);*/
}
