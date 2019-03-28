const drawModule = (function(){
  var bodySnake = function(x, y) {
        // This is the single square
        ctx.fillStyle = "green";
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        // Border
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    };
  var pizza = function(x, y) {
        ctx.fillStyle = "darkred";
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = "red";
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
    };
  var scoreText = function() {
        var score_text = "Score: " + score;
        ctx.fillStyle = "black";
        ctx.fillText(score_text, 145, h-4);
        ctx.font = ("16px VT323");
    };
  var drawSnake = function() {
        // Setup initial length and accumulator.
        var length = 4;
        snake = [];
        for (var i = length; i >= 0; i--) {
            snake.push({x:i, y:0});
        }  
    };
  var createFood = function() {
          food = {
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        }
        //Make sure snake and food are not in the same initial position
        for (var i = 0; i > snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;
             if (food.x===snakeX || food.y === snakeY || food.y === snakeY && food.x===snakeX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    };
  var checkCollision = function(x, y, array) {
        for(let i = 0; i < array.length; i++) {
            if(array[i].x === x && array[i].y === y)
            return true;
        } 
        return false;
       
    };
  var paint = function () {
    //Playground
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);
    //Disable the button _start_ while you're playing.
    btn.setAttribute("disabled", true);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    //Movements
    if (direction == "right") {
        snakeX++;
    } else if (direction == "left") {
        snakeX--;
    } else if (direction == "up") {
        snakeY--;
    } else if (direction == "down") {
        snakeY++;
    }
    if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {
        //Stop the game & make the start button enabled again.
        alert("GAME OVER!")
        document.location.reload();
        btn.removeAttribute("disabled", true);
        //Clear.
        ctx.clearRect(0, 0, w, h);
        gameloop = clearInterval(gameloop);
        return;
    }
    if (snakeX == food.x && snakeY == food.y) {
        //Make snake grow
        var tail = {
            x: snakeX,
            y: snakeY
        };
        score++;
        //Create new food.
        createFood();
    } else {
        var tail = snake.pop();
        tail.x = snakeX;
        tail.y = snakeY;
    }
    snake.unshift(tail);
    //For each element of the array create a square using the bodySnake function we created before.
    for (var i = 0; i < snake.length; i++) {
        bodySnake(snake[i].x, snake[i].y);
    }
    //Create food using the _pizza_ function.
    pizza(food.x, food.y);
    //Put the score text.
    scoreText();
};
  
  var init = function () {
      direction = "down";
      drawSnake();
      createFood();
      gameloop = setInterval(paint, 100);
  };
  return {
      init: init
  };
}());
