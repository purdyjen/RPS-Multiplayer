$(document).ready(function() {  //doc ready

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
  
// Create a variable to reference the database.
var database = firebase.database();

$("#player-one-submit").on("click", function (){
  playerOneSelection = $('input[name=choiceRadios]:checked').val();
  console.log(selection);
});

$("#player-two-submit").on("click", function (){
  playerTwoSelection = $('input[name=choiceRadios]:checked').val();
  console.log(selection);
});

}); //doc ready closing tag