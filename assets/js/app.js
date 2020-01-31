$(document).ready(function() {
  //doc ready
  $("#both").hide();
  $("#one").hide();
  $("#none").hide();

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

  //initial values
  var database = firebase.database();  
  var playerOne = "";
  var playerTwo = "";
  var playerOneExists = false;
  var playerTwoExists = false;
  var playerOneChoice = null;
  var playerTwoChoice = null;
  var numPlayers = database.ref("numPlayers");
  var playerChoices = database.ref("numPlayers");
  var oneChoice = playerChoices.child("oneChoice");
  var twoChoice = playerChoices.child("twoChoice");
  var playersRef = database.ref("players");
  var playerOneRef = playersRef.child("playerOne");
  var playerTwoRef = playersRef.child("playerTwo");
  $("#game-room").hide();

 

  function getGameInfo() {
    playersRef.on("value", function(snapshot) {
      numPlayers = snapshot.numChildren();
      playerOneExists = snapshot.child("playerOne").exists();
      playerTwoExists = snapshot.child("playerTwo").exists();
      if (playerOneExists && playerTwoExists) {
        event.preventDefault();
        console.log("both");
        playerOne = snapshot.child("playerOne");
        playerTwo = snapshot.child("playerTwo");
        console.log(playerOne, playerTwo);
        alert("Sorry! Game is full. Try again later.");
        $("#play-game").show();
        $("#game-room").hide();
        return;
      } else if (playerOneExists) {
        event.preventDefault();
        $("#game-room").show();
        $("#player-one").hide();
        $("#results").hide();
        console.log("one");
        return;
      } else {
        event.preventDefault();
        $("#game-room").show();
        $("#player-two").hide();
        $("#player-one-choice").hide();
        $("#results").hide();
        console.log("none");
        return;
      }
    });
  }

  $("#play-game").on("click", function() {
    event.preventDefault();
    $("#play-game").hide();
    getGameInfo();
  });

  $("#add-player-one").on("click", function() {
    event.preventDefault();
    playerOne = $("#player-one-name-input").val();
    $("#player-one").text("Player 1: " + playerOne);
    $("#player-one-name-form").hide();
    $("#player-one-choice").show();
    playerOneRef.push({
      name: playerOne,
      choice: playerOneChoice,
      wins: 0,
      losses: 0
    });
  });

  $("#add-player-two").on("click", function() {
    event.preventDefault();
    playerTwo = $("#player-two-name-input").val();
    $("#player-two").text("Player 2: " + playerTwo);
    $("#player-two-name-form").hide();
    $("#player-two-choice").removeClass("hide");
    playerTwoRef.push({
      name: playerTwo,
      choice: playerTwoChoice,
      wins: 0,
      losses: 0
    });
  });

  $("#player-one-submit").on("click", function() {
    event.preventDefault();
    playerOneChoice = $("input[name=player-one-choice-radios]:checked").val();
    // Code for handling the push
    playersRef.ref("/playerOne").set({
      name: playerOne,
      choice: playerOneChoice,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  $("#player-two-submit").on("click", function() {
    event.preventDefault();
    playerTwoChoice = $("input[name=player-two-choice-radios]:checked").val();
    // Code for handling the push
    playersRef.ref("/playerTwo").set({
      name: playerTwo,
      choice: playerTwoChoice,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });
}); //doc ready closing tag
