/*=====================================================
 * Bouncy.js
 * Written By : Nick Italiano
 * Contains all Objects, and logic for matching game
 ======================================================*/
;
/**
* Board Class
* @param width
* @param height
*/
var Board = Class.create({
  initialize : function(width, height){
		this.width = width;
		this.height = height;
		this.board = undefined;
	},
	
	
	
	/**
	 * Creates board, and attaches it to dom
	 * @param color - html color of Board
	 */
	create : function(color){
		// create element
		this.board = document.createElement('div');
		
		// set id and extend
		this.board.id = 'board';
		Element.extend(this.board);
		
		// set css
		$(this.board).setStyle({
			position : 'absolute',
			left : '0px',
			right : '0px',
			margin : 'auto',
			width : this.width+'px',
			height : this.height+'px',
			backgroundColor : color
		});
		
		// place on screen
		document.body.appendChild(this.board);
	},
	
	
	/**
	 * @return html board element
	 */
	get : function(){
		return this.board;
	}				
});





/**
* Bubble Class
* @param radius
* @param left - left css position of Bubble
* @param top - top css position of Bubble
*/
var Bubble = Class.create({
	initialize : function(radius, left, top){
		this.board = document.getElementById('board');
		this.radius = radius;
		this.left = left;
		this.top = top;
		this.bubble = undefined;
	},
	
	
	/**
	 * Create bubble, and attach it to dom
	 * @param number - # of bubble element
	 * @param color - html color of Bubble Object
	 */
	create : function(number, color){
		this.bubble = document.createElement('div');
		this.bubble.id = 'bubble_' + number;
		$(this.bubble).addClassName('bubble');
		
		Element.extend(this.bubble);
		
		this.bubble.setStyle({
			position : 'absolute',
			width : 2 * this.radius+'px',
			height : 2 * this.radius+'px',
			top : this.top+'px',
			left : this.left+'px',
			backgroundColor : color
		});
		
		
		this.board.appendChild(this.bubble);
	},
	
	
	/**
	 * Gets html bubble element
	 */
	get : function(){
		return this.bubble;
	},
	
	/**
	 * Gets html bubble element id
	 */
	getId : function(){
		return this.bubble.id;
	},
	
	
	/**
	 * Gets top css value
	 */
	topCss : function(){
		return Number(this.bubble.getStyle('top').replace('px', ''));
	},
	
	
	/**
	 *  Gets left css value
	 */
	leftCss : function(){
		return Number(this.bubble.getStyle('left').replace('px', ''));
	},
	
	
	/**
	 *  Checks for Bubble collisions with this Bubble Object
	 * @param bubbles - array of Bubble Objects
	 * @param animation - current Animation Object
	 * @param animations - array of Animation Objects
	 */
	collision: function(bubbles, animation, animations){
		var owner = this;
		setInterval(function(){
			for (var j = 0; j < bubbles.length; j++) {
				if (owner.getId() != bubbles[j].getId()) {
					var coordUtils = new CoordUtils(owner.leftCss(), bubbles[j].leftCss(), owner.topCss(), bubbles[j].topCss());
					var dx = (coordUtils.right + 25) - (coordUtils.left + 25);
					var dy = (coordUtils.top + 25) - (coordUtils.bottom + 25);
					var distance = Math.sqrt(dx * dx + dy * dy);
					
					if (coordUtils.left + 50 > coordUtils.right && coordUtils.left < coordUtils.right + 50 && 
							coordUtils.top + 50 > coordUtils.bottom && coordUtils.top < coordUtils.bottom + 50){
						if( distance < 50 ){
							var pos1_x = 0.5 * (1 + 50) / 50;
							var pos1_y = 2 * pos1_x;
							var pos2_x = 3 * pos1_x;
							var pos2_y = 4 * pos1_y;
							if( owner.leftCss() < bubbles[j].leftCss() && owner.topCss() < bubbles[j].topCss() ){
								animation.moveBubble(-pos1_x,-pos1_y);
								animations[j].moveBubble(pos2_x,pos2_y);
							} else if ( owner.leftCss() < bubbles[j].leftCss() && owner.topCss() > bubbles[j].topCss() ){
								animation.moveBubble(-pos1_x,pos1_y);
								animations[j].moveBubble(pos2_x,-pos2_y);
							} else if ( owner.leftCss() > bubbles[j].leftCss() && owner.topCss() < bubbles[j].topCss() ){
								animation.moveBubble(pos1_x,-pos1_y);
								animations[j].moveBubble(-pos2_x,pos2_y);
							} else if ( owner.leftCss() > bubbles[j].leftCss() && owner.topCss() > bubbles[j].topCss() ){
								animation.moveBubble(pos1_x, pos1_y);
								animations[j].moveBubble(-pos2_x,-pos2_y);
							}
						} 
					}
				}
			}
		}, 1);
	}
});





/**
* Animation Class
*/
var Animation = new Class.create({
	
	
	
	/**
	 * Sets html bubble element
	 * @param bubble
	 */
	initialize : function(bubble){
		this.bubble = bubble;
		this.interval = undefined;
	},
	
	
	
	/**
	 * Checks boundaries and moves Bubble Objects
	 * @param dx - change on x-axis
	 * @param dy - change on y-axis
	 */
	moveBubble : function(dx, dy){
		var current_x = Number(this.bubble.getStyle('left').replace('px', ''));
		var current_y = Number(this.bubble.getStyle('top').replace('px', ''));
		
		if( current_x + dx <= 0 ){
			dx = 0.5;
		} else if( current_x + dx >= 270){
			dx = -0.5;
		}
		
		if( current_y + dy <= 0 ){
			dy = 0.5;
		} else if( current_y + dy >= 430){
			dy = -0.5;
		}
		
		if(current_x <= 0){
			this.bubble.style.left = (current_x + dx)+'px';
			dx = .5;
		} else if(current_y <= 0){
			this.bubble.style.top = (current_y + dy)+'px';
			dy = .5;
		} else if(current_x >= 270){
			this.bubble.style.left = (current_x + dx)+'px';
			dx = -.5;
		} else if(current_y >= 430){
			this.bubble.style.top = (current_y + dy)+'px';
			dy = -.5;
		} else {
			this.bubble.style.left = (current_x + dx)+'px';
			this.bubble.style.top = (current_y + dy)+'px';
		}
		
		return [dx, dy];
	},
	
	
	
	/**
	 * Starts animation loop for the Bubble Objects
	 * @param x - velocity of x
	 * @param y - velocity of y
	 */
	start : function(x, y){
		var points = [x, y];
		var owner = this;
		
		this.interval = setInterval(function(){
			points = owner.moveBubble(points[0],points[1]);
		}, 1);
	}
});




/**
 *  CoordUtils Class
 */
var CoordUtils = new Class.create({
	
	
	/**
	 * Sets top, right, bottom, and left points
	 * @param x1 - value of left css position, bubble 1
	 * @param x2 - value of left css position, bubble 2
	 * @param y1 - value of top css position, bubble 1
	 * @param y2 - value of top css position, bubble 2
	 */
	initialize : function(x1, x2, y1, y2){
		this.top = 0;
		this.bottom = 0;
		this.right = 0;
		this.left = 0;
		
		if( x1 <= x2 ){
			this.left += x1;
			this.right += x2;
		} else {
			this.left += x2;
			this.right += x1;
		}
		
		if( y1 <= y2 ){
			this.bottom += y1;
			this.top += y2;
		} else {
			this.bottom += y2;
			this.top += y1;
		}
	}
});
