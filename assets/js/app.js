$(document).ready(function() {  //doc ready

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBqSc9Clq98i4lKcSOFvL0kku_LIGu_qcs",
    authDomain: "rock-paper-scissors-5b1e2.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-5b1e2.firebaseio.com",
    projectId: "rock-paper-scissors-5b1e2",
    storageBucket: "rock-paper-scissors-5b1e2.appspot.com",
    messagingSenderId: "751589098534",
    appId: "1:751589098534:web:afdc78dd4b7238d3ef12e7",
    measurementId: "G-GW303GLM61"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
// Create a variable to reference the database.
var database = firebase.database();

// --------------------------------------------------------------
// Link to Firebase Database for viewer tracking


// --------------------------------------------------------------
// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------
// Creates an array that lists out all of the options (Rock, Paper, or Scissors).
 var computerChoices = ["r", "p", "s"];

 // Creating variables to hold the number of wins, losses, and ties. They start at 0.
 var wins = 0;
 var losses = 0;
 var ties = 0;

 // Create variables that hold references to the places in the HTML where we want to display things.
 var directionsText = $("#directions-text");
 var userChoiceText = $("#userchoice-text");
 var computerChoiceText = $("#computerchoice-text");
 var winsText = $("#wins-text");
 var lossesText = $("#losses-text");
 var tiesText = $("#ties-text");

 // This function is run whenever the user presses a key.
 $(document).on("keyup", function(event) {

   // Determines which key was pressed.
   var userGuess = event.key;

   // Randomly chooses a choice from the options array. This is the Computer's guess.
   var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

   // Reworked our code from last step to use "else if" instead of lots of if statements.

   // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
   if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

     if ((userGuess === "r" && computerGuess === "s") ||
       (userGuess === "s" && computerGuess === "p") || 
       (userGuess === "p" && computerGuess === "r")) {
       wins++;
     } else if (userGuess === computerGuess) {
       ties++;
     } else {
       losses++;
     }

     // Hide the directions
     directionsText.textContent = "";

     // Display the user and computer guesses, and wins/losses/ties.
     userChoiceText.textContent = "You chose: " + userGuess;
     computerChoiceText.textContent = "The computer chose: " + computerGuess;
     winsText.textContent = "wins: " + wins;
     lossesText.textContent = "losses: " + losses;
     tiesText.textContent = "ties: " + ties;
   }
 });

}); //doc ready closing tag