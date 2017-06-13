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
//dbRef.on('value', snap => setMessages(snap.val()));

function send() {
  var now = new Date();
  var id = now.getTime();
  var urlAvatar = 'https://pbs.twimg.com/profile_images/831958905987010560/0pKEhzWj_400x400.jpg';
  var mTitle = $('#typed-title').val();;
  var mMessage = $('#typed-message').val();

  if (mTitle.length > 0 && mMessage.length > 0) {
    var notification = {
      idea: id,
      urlAvatar: urlAvatar,
      title: mTitle,
      message: mMessage
    };

    dbRef.child(id).set(notification);
    sendNotification(mTitle, mMessage);
  } else {
    alert("Write a title and a message");
  }
}

function sendNotification(mTitle, mMessage) {
  var not = {
    notification: {
      title: mTitle,
      body: mMessage
    },
    to: "/topics/news"
  };

  /*****/
  $.ajax({
    url: 'https://fcm.googleapis.com/fcm/send',
    type: 'POST',
    data: JSON.stringify(not),
    dataType: "json",
    beforeSend: function(request) {
      request.setRequestHeader("Content-Type", "application/json");
      request.setRequestHeader("Authorization", "key=AAAAWjkEf-A:APA91bGoIMgKi2FZAT1G19YJOaxdY5UsRuK0bqK99Np0shPaY-TGPGlePTbz9A8jUycGSTY-hxu4xwYUiMKbfDIIs9LOu8TJ0d2pGKz48E-WCrBd7le8PC03up0bKarSQBdRfA3P1c7L");
    },
    success: function(response) {
      alert("Message Sent");
      console.log(response);
    },
    error: function(error) {
      alert("Can't send the message");
      console.log(error);
    }
  });


}
