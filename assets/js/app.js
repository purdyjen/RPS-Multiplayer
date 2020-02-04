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

  //initial values
  var database = firebase.database();  
  var playerOne = "";
  var playerTwo = "";
  var playerOneExists = false;
  var playerTwoExists = false;
  var playerOneChoice = null;
  var playerTwoChoice = null;
  var numPlayers = database.ref("numPlayers");
  var choiceRef = database.ref("choices");
  var oneChoiceRef = choiceRef.child("playerOne");
  var twoChoiceRef = choiceRef.child("playerTwo");
  var playersRef = database.ref("players");
  var playerOneRef = playersRef.child("playerOne");
  var playerTwoRef = playersRef.child("playerTwo");
  $("#game-room").hide();
  $("#results").hide();
 

  
    playersRef.on("value", function(snapshot) {
      //length of array
      numPlayers = snapshot.numChildren();
      //checks if players exist
      playerOneExists = snapshot.child("playerOne").exists();
      playerTwoExists = snapshot.child("playerTwo").exists();
      // Player data objects
      playerOne = snapshot.child("playerOne").val();
      playerTwo = snapshot.child("playerTwo").val();
      // If theres a player 1, fill in name and win loss data
    
    });
  

  $("#play-game").on("click", function() {
    // event.preventDefault();
    $("#play-game").hide();
    if (numPlayers < 2) {
      if (playerOneExists) {
        $("#game-room").show();
        $("#player-one").hide();
        $("#results").hide();
      } else {
        $("#game-room").show();
        $("#player-two").hide();
        $("#results").hide();
      }
    } else {
      alert("Sorry! Game is full. Try again later.");
      $("#play-game").show();
      $("#game-room").hide();
    }
  });

  $("#add-player-one").on("click", function() {
    // event.preventDefault();
    playerOne = $("#player-one-name-input").val();
    $("#player-one-name").text("Player 1: " + playerOne);
    $("#player-one-results-name").text("Player 1: " + playerOne);
    $("#player-one-name-form").hide();
    $("#player-one-choice").removeClass("hide");
    playerOneRef.push({
      name: playerOne,
      wins: 0,
      losses: 0
    });
    choiceRef.push(oneChoiceRef);
  });

  $("#add-player-two").on("click", function() {
    // event.preventDefault();
    playerTwo = $("#player-two-name-input").val();
    $("#player-two-name").text("Player 2: " + playerTwo);
    $("#player-two-results-name").text("Player 2: " + playerTwo);
    $("#player-two-name-form").hide();
    $("#player-two-choice").removeClass("hide");
    playerTwoRef.push({
      name: playerTwo,
      wins: 0,
      losses: 0
    });
  });

  $("#player-one-submit").on("click", function() {
    event.preventDefault();
    playerOneChoice = $("input[name=player-one-choice-radios]:checked").val();
    // Code for handling the push
    oneChoiceRef.set({
      choice: playerOneChoice
    });
    $("#player-one").hide();
    $("#results").show();
    $("#play-again").hide();
  });

  $("#player-two-submit").on("click", function() {
    event.preventDefault();
    playerTwoChoice = $("input[name=player-two-choice-radios]:checked").val();
    // Code for handling the push
    twoChoiceRef.set({
      choice: playerTwoChoice
    });
    $("#player-two").hide();
    $("#results").show();
    $("#play-again").hide();
  });

  choiceRef.on("child_added", function(snapshot) {
    //length of array
    numChoices = snapshot.numChildren();
    if (numChoices === 2) {
      results();
    } else if (numChoices === 1) {
      $("#results-text").text("Waiting for Player Two's Selection...");
    } else {
      $("#results-text").text("Waiting for Player One's Selection...");
    }
  });

  function tie() {
    $("#results-text").text("It's a tie!");
    $("#play-again").show();
  }

  function playerOneWins() {
    $("#results-text").text(playerOneRef.name.val() + " wins!");
    $("#play-again").show();
  }

  function playerTwoWins() {
    $("#results-text").text(playerTwoRef.name.val() + " wins!");
    $("#play-again").show();
  }

  function results () {
    var one = oneChoiceRef.choice;
    var two = twoChoiceRef.choice;
    if (one === "r" && two === "r") {
      tie();
    } else if (one === "p" && two === "p") {
      tie();
    } else if (one === "s" && two === "s") {
      tie();
    } else if (one === "r" && two === "s") {
      playerOneWins();
    } else if (one === "s" && two === "p") {
      playerOneWins();
    } else if (one === "p" && two === "r") {
      playerOneWins();
    } else if (one === "r" && two === "p") {
      playerTwoWins();
    } else if (one === "s" && two === "r") {
      playerTwoWins();
    } else if (one === "p" && two === "s") {
      playerTwoWins();
    }
  }

  $("#play-again").on("click", function() { 
    oneChoiceRef.remove();
    twoChoiceRef.remove();

  });
}); //doc ready closing tag
