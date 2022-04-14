alert("Use Arrow Keys To Operate and SpaceBar to Pause/Resume");

//global variables
//snake array
var snake = [ {x: 9,y: 9} ];
//food coordinates
let food = {x: 3,y: 3};
//direction in which snake should move
let dir = {x: 0,y: 0};
let lastPaintTime=0;
var score = 0;
var highScore = 0;
// to store previous direction
var x1 = 0;
var y1 = 0;


function displayScore(){
  var str = "Your Score is &nbsp&nbsp&nbsp" + score + "<br>High Score is &nbsp&nbsp&nbsp" + highScore;
  document.getElementById("scoreText").innerHTML = str;
}

function main(ctime){
  window.requestAnimationFrame(main);

  // updating after every 0.15 seeconds
  if((ctime-lastPaintTime)/1000<0.08)
  return;
  lastPaintTime=ctime;

  displayScore();

  // update snake
  if(dir.x!=0 || dir.y!=0 ){
    snake.unshift({x: snake[0].x + dir.x, y: snake[0].y + dir.y});
    snake.pop();
  }

  // if game overs
  if(gameOver()){

    // notify game in over and reassign variables
    // and start game form beginning
    highScore = Math.max(highScore,score);
    alert("Game Over ! \n Your Score is  " + score + " \n High Score is " + highScore);
    score=0;
    snake = [ {x: 9,y: 9} ];
    food = {x: 3,y: 3};
    dir = {x: 0,y: 0};
    x1 = 0;
    y1 = 0;
  }

  // eats food
  if(snake[0].x === food.x && snake[0].y === food.y){
    score+=1;
    snake.unshift({x: snake[0].x + dir.x, y: snake[0].y + dir.y});
    food.x = Math.floor(Math.random()*18) + 1;
    food.y = Math.floor(Math.random()*18) + 1;
  }

  // display snake
  squareBoard.innerHTML="";
  for(var i=0;i<snake.length;i++){
    snakePart = document.createElement('div');
    snakePart.style.gridRowStart = snake[i].x;
    snakePart.style.gridColumnStart = snake[i].y;

    if(i===0){
      snakePart.classList.add('snakeHead');
    }
    else{
      snakePart.classList.add('snakeBody');
    }
    squareBoard.appendChild(snakePart);
  }


  // display snake food
  snakeFood = document.createElement('div');
  snakeFood.style.gridRowStart = food.x;
  snakeFood.style.gridColumnStart = food.y;
  snakeFood.classList.add('foodForSnake');
  squareBoard.appendChild(snakeFood);

}

// to check if game overs
function gameOver(){

  // if goes out of bound
  if(snake[0].x<=0 || snake[0].x>=19 || snake[0].y<=0 || snake[0].y>=19)
  return true;

  // if bumps into itself
  for(var i=1;i<snake.length;i++){
    if(snake[0].x === snake[i].x && snake[0].y === snake[i].y)
    return true;
  }
  return false;
}


window.requestAnimationFrame(main);

// to check for key pressed
window.addEventListener('keydown', e =>{
switch (e.key) {
  // to pause game
  case " ":

      // if not already paused
      if(dir.x!=0 || dir.y!=0)
      {dir.x = 0;
      dir.y = 0;}
      else{           // if already paused
      dir.x = x1;
      dir.y = y1;
      }
      break;

  case "ArrowUp":
      if(x1===1)      // if moving in down direction
      break;
      dir.x = -1;
      dir.y = 0;
      x1 = dir.x;
      y1 = dir.y;
      break;

  case "ArrowDown":
      if(x1==-1)      // if moving in up direction
      break;
      dir.x = 1;
      dir.y = 0;
      x1 = dir.x;
      y1 = dir.y;
      break;

  case "ArrowLeft":
      if(y1==1)       // if moving right direction
      break;
      dir.x = 0;
      dir.y = -1;
      x1 = dir.x;
      y1 = dir.y;
      break;

  case "ArrowRight":
      if(y1===-1)     // if moving in left direction
      break;
      dir.x = 0;
      dir.y = 1;
      x1 = dir.x;
      y1 = dir.y;
      break;

  default:
      break;
}

});
