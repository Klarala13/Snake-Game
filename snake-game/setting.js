//Setup
var mycanvas = document.getElementById('mycanvas');
var ctx = mycanvas.getContext('2d');
var w = 350;
var h = 350;
var score = 0;
var snake;
var snakeSize = 10;
var food;
var direction;
var gameloop;