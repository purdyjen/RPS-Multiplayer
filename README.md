# rps
Rock-Paper-Scissors


Pseudo-code:

## Multiplayer
 * display two user sign-up forms
    * same layout as in Star Wars RPG?
    * is sign-up necessary? sufficient just to have player one and player two?
 * player one inputs name and selects RPS
    * data sent to realtime database
    * player one form disappears from UI
 * player two inputs name and selects RPS
    * data updated
    * player two form disappears
 * code checks selections and determines winner
 * game results displayed
    * Play again?
        * if both select yes, play continues, win/loss info displayed
        * if one player selects no, player's data removed from DB and corresponding user sign-up displayed
        * if both select no, all data removed and game reset