$(document).ready(function() {
  //doc ready

  var config = {
    apiKey: "AIzaSyBqSc9Clq98i4lKcSOFvL0kku_LIGu_qcs",
    authDomain: "rock-paper-scissors-5b1e2.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-5b1e2.firebaseio.com",
    projectId: "rock-paper-scissors-5b1e2",
    storageBucket: "rock-paper-scissors-5b1e2.appspot.com",
    messagingSenderId: "751589098534"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  var database = firebase.database();

  //initial values
  var initialPlayerOne = "";
  var initialPlayerTwo = "";
  var playerOne = initialPlayerOne;
  var playerTwo = initialPlayerTwo;
  var game = database.ref("/game");

  database.ref("/game").on("child_added", function(snapshot) {

    // If Firebase has a playerOne and no playerTwo (first case)
    if (snapshot.child("PlayerOne").exists() && snapshot.child("playerTwo").exists()) {

      // Set the local variables for highBidder equal to the stored values in firebase.
      playerOne = snapshot.val();
      playerTwo = parseInt(snapshot.val());

      // change the HTML to reflect the newly updated local values (most recent information from firebase)
      // $("#highest-bidder").text(snapshot.val().highBidder);
      // $("#highest-price").text("$" + snapshot.val().highPrice);

      // Print the local data to the console.
      console.log(snapshot.val().playerOne);
      console.log(snapshot.val().playerTwo);
    } else if (snapshot.child("PlayerOne").exists() && playerTwo === initialPlayerTwo) {
        playerTwo = userId;
        // Code for handling the push
        database.ref("/game/playerTwo").push({
          name: playerTwo,
          choice: "",
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      } else {
    var userId = prompt("Username?", "Guest");
    $("#player-one").text("Player 1: " + userId);
    playerOne = userId;
    // Code for handling the push
    database.ref("/game/playerOne").push({
      name: playerOne,
      choice: "",
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  }
});

  $("#player-one-submit").on("click", function() {
    playerOneChoice = $("input[name=choiceRadios]:checked").val();
    // Code for handling the push
    database.ref("/game/playerOne").set({
      name: playerOne,
      choice: playerOneChoice,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  $("#player-two-submit").on("click", function() {
    playerTwoChoice = $("input[name=choiceRadios]:checked").val();
    // Code for handling the push
    database.ref("/game/playerTwo").set({
      name: playerTwo,
      choice: playerTwoChoice,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  // Firebase watcher .on("child_added"
  database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    console.log(sv);
  });

  }); //doc ready closing tag
