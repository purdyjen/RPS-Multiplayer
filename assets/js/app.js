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

  var database = firebase.database();

  //initial values
  var playerOne = "";
  var playerTwo = "";
  $("#game-room").hide();
 
  function assignPlayers(){
    if (
      playerOne !== null && playerTwo !== null
    ) {
      event.preventDefault();
      console.log("both");
      alert("Sorry! Game is full. Try again later.");
      $("#play-game").show();
      $("#game-room").hide();
      return;
    } else if (playerOne !== null) {
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
  }

  function getGameInfo() {
      database.ref().on("value", function(snapshot) {
      playerOne = snapshot.child("playerOne");
      playerTwo = snapshot.child("playerTwo");
      console.log(playerOne, playerTwo);
      assignPlayers();
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
    playerOneChoice = "";
    $("#player-one").text("Player 1: " + playerOne);
    $("#player-one-name-form").hide();
    $("#player-one-choice").show();
    database.ref("/playerOne").push({
      name: playerOne,
      choice: playerOneChoice,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  $("#add-player-two").on("click", function() {
    event.preventDefault();
    playerTwo = $("#player-two-name-input").val();
    playerTwoChoice = "";
    $("#player-two").text("Player 2: " + playerTwo);
    $("#player-two-name-form").hide();
    $("#player-two-choice").removeClass("hide");
    database.ref("/playerTwo").push({
      name: playerTwo,
      choice: playerTwoChoice,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  $("#player-one-submit").on("click", function() {
    event.preventDefault();
    playerOneChoice = $("input[name=player-one-choice-radios]:checked").val();
    // Code for handling the push
    database.ref("/playerOne").set({
      name: playerOne,
      choice: playerOneChoice,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  $("#player-two-submit").on("click", function() {
    event.preventDefault();
    playerTwoChoice = $("input[name=player-two-choice-radios]:checked").val();
    // Code for handling the push
    database.ref("/playerTwo").set({
      name: playerTwo,
      choice: playerTwoChoice,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });
}); //doc ready closing tag
