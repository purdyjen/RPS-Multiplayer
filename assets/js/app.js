$(document).ready(function() {  //doc ready


  var config = {
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
  firebase.initializeApp(config);
  
// Create a variable to reference the database.
var database = firebase.database();
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected"); 

connectedRef.on("value", function(snap) {
  if (snap.val()) {
    //add user to connected list
    var connected = connectionsRef.push(true)
    //remove user when they disconnect
    connected.onDisconnect().remove();
  }
});


connectionsRef.on("value", function(snap) {
  // find spot on page where you want to show the number of connected viewers. 
  //Select it with JQ, then display with text the number of connected users that comes back from the snapshot
 });

/// part of the getInGame() function
function getInGame() {

  if (currentPlayers < 2) {
    if (playerOneExists) {
      playerNum = 2;
    } else {
      playerNum = 1;
    }
  };

  // Creates key based on assigned player number
  playerRef = database.ref("/players/" + playerNum);
  // Creates player object. 'choice' is unnecessary here, but I left it in to be as complete as possible
  playerRef.set({
    name: username,
    wins: 0,
    losses: 0,
    choice: null
  });
}


$("#player-one-submit").on("click", function (){
  playerOneChoice = $('input[name=choiceRadios]:checked').val();
  console.log(selection);
});

$("#player-two-submit").on("click", function (){
  playerTwoSelection = $('input[name=choiceRadios]:checked').val();
  console.log(selection);
});

}); //doc ready closing tag