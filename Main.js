/*================================
 * Main.js
 * Written By : Nick Italiano
 * Set's up game loop
 ================================*/



// create game board
var board = new Board(320, 480);
board.create('blue');



// Array of Bubble Objects
var bubbles = new Array();
var animations = new Array();



// create bubbles
var bubble1 = new Bubble(25, 0, 0);
bubble1.create(0, 'black');
bubbles[0] = bubble1;
animations[0] = new Animation(bubble1.get());
animations[0].start(0.5,-0.5);

var bubble2 = new Bubble(25, 270, 0);
bubble2.create(1, 'black');
bubbles[1] = bubble2;
animations[1] = new Animation(bubble2.get());
animations[1].start(-0.5,0.5);

var bubble3 = new Bubble(25, 0, 250);
bubble3.create(2, 'black');
bubbles[2] = bubble3;
animations[2] = new Animation(bubble3.get());
animations[2].start(0.5,0.5);

var bubble4 = new Bubble(25, 270, 250);
bubble4.create(3, 'black');
bubbles[3] = bubble4;
animations[3] = new Animation(bubble4.get());
animations[3].start(-0.5,-0.5);

var bubble5 = new Bubble(25, 0, 430);
bubble5.create(4, 'black');
bubbles[4] = bubble5;
animations[4] = new Animation(bubble5.get());
animations[4].start(-0.5,-0.5);

var bubble6 = new Bubble(25, 270, 430);
bubble6.create(5, 'black');
bubbles[5] = bubble6;
animations[5] = new Animation(bubble6.get());
animations[5].start(0.5,0.5);


// set collision interval for all Bubble Objects
for(var i = 0; i < bubbles.length; i++){
  bubbles[i].collision(bubbles,animations[i], animations);
}
