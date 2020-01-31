# rps
Rock-Paper-Scissors


Pseudo-code:

## Multiplayer
 * play game button
 * check firebase values
 * display two user sign-up forms
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




References:
https://gist.github.com/anantn/4323981#file-firebase_player_assignment-js-L57
https://www.youtube.com/watch?v=_xpkumd1VFs
