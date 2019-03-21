const drawModule = (function(){
  var bodySnake = function(x, y) {
        // This is the single square
        ctx.fillStyle = "green";
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        // This is the border of the square
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    };
  var pizza = function(x, y) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        // This is the single yellow square 
        ctx.fillStyle = "red";
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
    };
  var scoreText = function() {
        // How many pizzas did the snake eat
        var score_text = "Score: " + score;
        ctx.fillStyle = "blue";
        ctx.fillText(score_text, 145, h-5);
    };
  var drawSnake = function() {
        // Initially the body of the snake will be formed by 5 squares.
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
        //Look at the position of the snake's body because food cannot have same position
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
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);

    //Disable the button _start_ while you're playing.
    btn.setAttribute("disabled", true);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
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
        alert ("GAME OVER")
        document.location.reload();
        btn.removeAttribute("disabled", true);
        //Clean up the canvas.
        ctx.clearRect(0, 0, w, h);
        gameloop = clearInterval(gameloop);
        return;
    }
    if (snakeX == food.x && snakeY == food.y) {
        //Create a new square instead of moving the tail.
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
      gameloop = setInterval(paint, 80);
  };
  return {
      init: init
  };
}());
