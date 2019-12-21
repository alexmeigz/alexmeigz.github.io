//color theme
const BACKGROUND_COLOR = "rgb(36, 123, 160)";
const PLAYER1_COLOR = "#F25F5C";
const PLAYER2_COLOR = "#FFE066";

//start of the game
var p1 = prompt("Player 1, you will be red. Please enter your name: ");
var p2 = prompt("Player 2, you will be yellow. Please enter your name: ");
var h3 = $("h3");
$("h3").text(p1 + ": It is your turn; please pick a column to drop your red chip.")

//translates buttons to a 2D matrix
var gamestate = [];
for(row = 0; row < 6; row++){
  var arr = [];
  for(col = 0; col < 7; col++){
      arr.push($("button").eq(row*7+col));
      $("button").eq(row*7+col).click(dropChip);
  }
  gamestate.push(arr);
}

//global variables
var turnTracker = true;
var gameOver = false;


//check if the game is over (Someone Won)
function checkGameOver(counter){
  if(counter >= 4){
    gameOver = true;
    if(turnTracker){
      $("h1").text(p1 + " has won! Refresh your browser to play again!");
    }
    else{
      $("h1").text(p2 + " has won! Refresh your browser to play again!");
    }
    $("h2").text("");
    h3.text("");
  }
}

//check if the game is over (Tied)
function checkTie(){
  for(col = 0; col < 7; col++){
    if(gamestate[0][col].css("background-color") == BACKGROUND_COLOR){
      return false;
    }
  }
  $("h1").text("The game has tied! Refresh your browser to play again!");
  $("h2").text("");
  h3.text("");
  return true;
}

//checks different possibilities to win
function checkWin(row, col){
  if(checkTie()){
    return;
  }
  //column span
  currColor = gamestate[row][col].css("background-color");
  var counter = 1;
  var r = row;
  while(true){
    if(outOfBounds(++r, col) || (currColor != gamestate[r][col].css("background-color"))){
      break;
    }
    else{
      counter++;
    }
  }
  checkGameOver(counter);
  //row span
  counter = 1;
  var c = col;
  while(true){
    if(outOfBounds(row, ++c) || (currColor != gamestate[row][c].css("background-color"))){
      break;
    }
    else{
      counter++;
    }
  }
  c = col;
  while(true){
    if(outOfBounds(row, --c) || (currColor != gamestate[row][c].css("background-color"))){
      break;
    }
    else{
      counter++;
    }
  }
  checkGameOver(counter);
  //diagonals
  //lower-left to upper-right
  counter = 1;
  r = row;
  c = col;
  while(true){
    if(outOfBounds(++r, ++c) || currColor != gamestate[r][c].css("background-color")){
      break;
    }
    else{
      counter++;
    }
  }
  r = row;
  c = col;
  while(true){
    if(outOfBounds(--r, --c) || currColor != gamestate[r][c].css("background-color")){
      break;
    }
    else{
      counter++;
    }
  }
  checkGameOver(counter);
  //upper-left to lower-right
  counter = 1;
  r = row;
  c = col;
  while(true){
    if(outOfBounds(--r, ++c) || currColor != gamestate[r][c].css("background-color")){
      break;
    }
    else{
      counter++;
    }
  }
  r = row;
  c = col;
  while(true){
    if(outOfBounds(++r, --c) || currColor != gamestate[r][c].css("background-color")){
      break;
    }
    else{
      counter++;
    }
  }
  checkGameOver(counter);
}

//checks if position is out of bounds
function outOfBounds(r, c){
  return 0 > r || r > 5 || 0 > c || c > 5;
}

//attempts to make move
function dropChip(){
  if(!gameOver){
    col = parseInt(this.id) - 1;
    for(row = 5; row >= 0; row--){
      if(gamestate[row][col].css("background-color") == BACKGROUND_COLOR){
        if(turnTracker){
          gamestate[row][col].css("background", PLAYER1_COLOR);
          h3.text(p2 + ": It is your turn; please pick a column to drop your yellow chip.")
        }
        else{
          gamestate[row][col].css("background", PLAYER2_COLOR);
          h3.text(p1 + ": It is your turn; please pick a column to drop your red chip.")
        }
        checkWin(row, col);
        turnTracker = !turnTracker;
        break;
      }
    }
  }
}
