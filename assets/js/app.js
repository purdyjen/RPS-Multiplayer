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

  $("#add-player-one").on("click", function () {
    event.preventDefault();
    playerOne = $("#player-one-name-input").val();
    playerOneChoice ="";
    $("#player-one").text("Player 1: " + playerOne);
    $("#player-one-name-form").hide();
    database.ref("/playerOne").push({
      name: playerOne,
      choice: playerOneChoice,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    $("#player-one-choice").removeClass("hide");
  });

  database.ref().on("child_added", function(snapshot) {

    // If Firebase has a playerOne and playerTwo (first case)
    if (snapshot.child("PlayerOne").exists() && snapshot.child("playerTwo").exists()) {

      // Set the local variables for highBidder equal to the stored values in firebase.
      playerOne = snapshot.val();
      playerTwo = snapshot.val();

      $("#player-one").text("Player 1: " + playerOne);
      $("#player-one-name-form").hide();
      $("#player-two").text("Player 1: " + playerOne);
      $("#player-two-name-form").hide();
      // Print the local data to the console.
      console.log(snapshot.val().playerOne);
      console.log(snapshot.val().playerTwo);
    } else if (snapshot.child("playerOne").exists() && playerTwo === initialPlayerTwo) {
      $("#player-one").text("Player 1: " + playerOne);
      $("#player-one-name-form").hide();
      } 
});

  $("#player-one-submit").on("click", function() {
    playerOneChoice = $("input[name=player-one-choice-radios]:checked").val();
    // Code for handling the push
    database.ref("/game/playerOne").set({
      name: playerOne,
      choice: playerOneChoice,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  $("#player-two-submit").on("click", function() {
    playerTwoChoice = $("input[name=player-two-choice-radios]:checked").val();
    // Code for handling the push
    database.ref("/game/playerTwo").set({
      name: playerTwo,
      choice: playerTwoChoice,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

 

  }); //doc ready closing tag
