//screen sizes
var XL_SCREEN = 1200;
var LG_SCREEN = 992;
var MD_SCREEN = 768;
var SM_SCREEN = 576;

//window size issues
function display(){
  if($(window).width() < LG_SCREEN){
    alert("Please use a increase your screen size or use device with a larger screen size to ensure the game is formatted correctly!");
  }
}

$(window).resize(display);
display();

//color theme
const BACKGROUND_COLOR = "rgb(36, 123, 160)";
const PLAYER1_COLOR = "#F25F5C";
const PLAYER2_COLOR = "#FFE066";

//start of the game
var turntext = $(".turntext");
var button = $(".btn-info");
button.eq(0).click(startGame);

//translates buttons to a 2D matrix
var gamestate = [];
for(row = 0; row < 6; row++){
  var arr = [];
  for(col = 0; col < 7; col++){
      arr.push($(".c4-button").eq(row*7+col));
      $(".c4-button").eq(row*7+col).click(dropChip);
  }
  gamestate.push(arr);
}

//global variables
var turnTracker = true;
var gameOver = false;

//start of game
function startGame(){
  button.css("display", "none");
  turntext.css("display", "initial");
  $("h1").text("Welcome to Connect Four!");
  $("h4").text("Rules: Each player takes turns placing a chip horizontally down one of seven columns. The first player to connect four of your colored chips in a row while preventing their opponent from doing the same WINS!");
  turntext.text("Player 1: click on a column to drop your red chip.");
  clearBoard();
  gameOver = false;
  turnTracker = true;
}

//clears the board
function clearBoard(){
  for(row = 0; row < 6; row++){
    for(col = 0; col < 7; col++){
      gamestate[row][col].css("background", BACKGROUND_COLOR);
    }
  }
}

//check if the game is over (Someone Won)
function checkGameOver(counter){
  if(counter >= 4){
    gameOver = true;
    if(turnTracker){
      $("h1").text("Player 1 has won! Congratulations!");
    }
    else{
      $("h1").text("Player 2 has won! Congratulations!");
    }
    button.css("display", "initial");
    $("h3").text("");
    $("h4").text("");
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
  button.css("display", "initial");
  $("h3").text("");
  $("h4").text("");
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
  //upper-left to lower-right
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
  //lower-left to upper-right
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
  return 0 > r || r > 5 || 0 > c || c > 6;
}

//Checks for validity of game move, and makes it if valid
function dropChip(){
  if(!gameOver){
    col = parseInt(this.id) - 1;
    for(row = 5; row >= 0; row--){
      if(gamestate[row][col].css("background-color") == BACKGROUND_COLOR){
        if(turnTracker){
          gamestate[row][col].css("background", PLAYER1_COLOR);
          turntext.text("Player 2: click on a column to drop your yellow chip.")
        }
        else{
          gamestate[row][col].css("background", PLAYER2_COLOR);
          turntext.text("Player 1: click on a column to drop your red chip.")
        }
        checkWin(row, col);
        turnTracker = !turnTracker;
        break;
      }
    }
  }
}
