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
  $("#exit-game").hide();

//WHILE TESTING ONLY
// $("#play-game").hide();
// $("#game-room").show();
// $("#player-one-name-form").hide();
// $("#player-two-name-form").hide();
// $("#player-one-choice").removeClass("hide");
// $("#player-two-choice").removeClass("hide");
//WHILE TESTING ONLY

    playersRef.on("value", function(snapshot) {
      //length of array
      numPlayers = snapshot.numChildren();
      //checks if players exist
      playerOneExists = snapshot.child("playerOne").exists();
      playerTwoExists = snapshot.child("playerTwo").exists();
      // Player data objects
      playerOne = snapshot.child("playerOne").val();
      playerTwo = snapshot.child("playerTwo").val();
        if (playerOneExists) {
          $("#player-one-results-name").text("Player One: " + playerOne.name);
          $("#player-one-wins").text("Wins: " + playerOne.wins);
          $("#player-one-losses").text("Losses: " + playerOne.losses);
        } else {
          $("#player-one-results-name").text("Waiting for Player One...");
          $("#player-one-wins").empty();
          $("#player-one-losses").empty();
        }
        
        if (playerTwoExists) {
          $("#player-two-results-name").text("Player Two: " + playerTwo.name);
          $("#player-two-wins").text("Wins: " + playerTwo.wins);
          $("#player-two-losses").text("Losses: " + playerTwo.losses);
        } else {
          $("#player-two-results-name").text("Waiting for Player Two...");
          $("#player-two-wins").empty();
          $("#player-two-losses").empty();
        }
    });
  

  $("#play-game").on("click", function() {
    // event.preventDefault();
    $("#play-game").hide();
    $("#exit-game").show();
    checkNumPlayers();
    
  });   
    function checkNumPlayers() {
      
      
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
    }

  $("#add-player-one").on("click", function() {
    // event.preventDefault();
    playerOne = $("#player-one-name-input").val();
    $("#player-one-name").text("Player One: " + playerOne);
    $("#player-one-name-form").hide();
    $("#player-one-choice").removeClass("hide");
    playerOneRef.set({
      name: playerOne,
      wins: 0,
      losses: 0
    });
  });

  $("#add-player-two").on("click", function() {
    // event.preventDefault();
    playerTwo = $("#player-two-name-input").val();
    $("#player-two-name").text("Player Two: " + playerTwo);
    $("#player-two-name-form").hide();
    $("#player-two-choice").removeClass("hide");
    playerTwoRef.set({
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
    
  });


  choiceRef.on("value", function(snapshot) {
    //length of array
    numChoices = snapshot.numChildren();
    oneChoice = snapshot.child("playerOne").val();
    twoChoice = snapshot.child("playerTwo").val();
    
    console.log(numChoices);
    
    if (numChoices === 2) {
      results();
      $("#results").show();
      $("#play-again-button").html("<button id=\"play-again\" class=\"btn btn-primary pull-right play-again\">Play Again</button>")
      $("#player-one").hide();
      $("#player-two").hide();
    } else if (numChoices === 1) {
      $("#results-text").text("Waiting for Player Two's Selection...");
    } else {
      $("#results-text").text("Waiting for Player One's Selection...");
    }
  });

  function tie() {
    $("#results-text").text("It's a tie!");
    
    checkWindow();
    
  }

  function playerOneWins() {
    $("#results-text").text(playerOne.name + " wins!");
    playersRef.child("playerOne").child("wins").set(playerOne.wins + 1);
    playersRef.child("playerTwo").child("losses").set(playerTwo.losses + 1);
    
    checkWindow();
    
  }

  function playerTwoWins() {
    $("#results-text").text(playerTwo.name + " wins!");
    playersRef.child("playerTwo").child("wins").set(playerTwo.wins + 1);
    playersRef.child("playerOne").child("losses").set(playerOne.losses + 1);
    
   
  }

  function checkWindow() {
    var isClosed = $(window).closed;
    if (isClosed) {
      oneChoiceRef.remove();
      twoChoiceRef.remove();
      playersRef.remove();
      
    }
  }

  function results () {
   
    var one = oneChoice.choice;
    var two = twoChoice.choice;
    console.log(one, two);
    
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
    } else {
      console.log("nothing happened");
    }
  }

  

$("#play-again-button").on("click", function() { 
    event.preventDefault();
    oneChoiceRef.remove();
    twoChoiceRef.remove();
    $("#results").hide();
    $("#player-one").show();
    $("#player-one-name-form").hide();
    $("#player-one-choice").removeClass("hide");
    $("#player-two").show();
    $("#player-two-name-form").hide();
    $("#player-two-choice").removeClass("hide");
    $("input[name='player-one-choice-radios']").prop("checked", false);
    $("input[name='player-two-choice-radios']").prop("checked", false);
    
    checkWindow();
  });

  $("#play-again-button").on("click", function() {
    playersRef.remove();
  });
}); //doc ready closing tag
