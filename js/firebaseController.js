var dbRef;
var data;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyATLmDD0PHqWqw-rCYvro-wrZ_YT9d5rSI",
    authDomain: "santo-digital-demos.firebaseapp.com",
    databaseURL: "https://santo-digital-demos.firebaseio.com",
    projectId: "santo-digital-demos",
    storageBucket: "santo-digital-demos.appspot.com",
    messagingSenderId: "1014988731530"
  };

firebase.initializeApp(config);

dbRef = firebase.database().ref().child("notifications");
//dbRef.on('value', snap => setMessages(snap.val()));

function send() {
  var now = new Date();
  var id = now.getTime();
  var urlAvatar = 'https://raw.githubusercontent.com/AlvarDev/SantosNotificationDemoWeb/master/ic_logo.png';
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
      request.setRequestHeader("Authorization", "key=AAAA7FIK9Io:APA91bG4wC2X0bY9W4UoDPgogu0SS4qaCVumopPl5pVaxfMOvsGlC0JU6OPxE3_G1AeZMu9Y2HF5o38oJOJSALlH1rTBmgmnkkvVDaWOlDwtA4eBnh7ZSBBuGBWFAIDFXLE-e42SZdrD");
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
