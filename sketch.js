//Creating sprite using sprite sheets for animation
var mouse_moved = false;
var touch_started = false;
var player_sprite_sheet;
var city_sheet;
var city_background;
var player_walk;
var player_stand;
var player_sprite;
var screenWidth;
var screenHeight;
var background_size;

var player_frames = [
	{'name':'player_walk00', 'frame':{'x':0, 'y': 0, 'width': 50, 'height': 167}},
	{'name':'player_walk01', 'frame':{'x':50, 'y': 0, 'width': 50, 'height': 167}},
	{'name':'player_walk02', 'frame':{'x':100, 'y': 0, 'width': 50, 'height': 167}},
	{'name':'player_walk03', 'frame':{'x':150, 'y': 0, 'width': 50, 'height': 167}},
	{'name':'player_walk04', 'frame':{'x':200, 'y': 0, 'width': 50, 'height': 167}}
];

function preload() {
	screenWidth = windowWidth;
	screenHeight = windowHeight;
	background_size = screenWidth / 1.8;

	console.log("bk width:"+screenWidth+" - bk height:"+background_size);

	// Load player sprite sheet from frames array
	//player_sprite_sheet = loadSpriteSheet('assets/player.png', player_frames);

	// Load the explode sprite sheet using frame width, height and number of frames
	player_sprite_sheet = loadSpriteSheet('assets/player.png', 100, 167, 5);

	// Player walk animation passing in a SpriteSheet
	//player_walk = loadAnimation(player_sprite_sheet);
	player_walk = loadAnimation(new SpriteSheet('assets/player.png',[
		{'name':'player_walk01', 'frame':{'x':100, 'y': 0, 'width': 100, 'height': 167}},
		{'name':'player_walk02', 'frame':{'x':200, 'y': 0, 'width': 100, 'height': 167}},
		{'name':'player_walk03', 'frame':{'x':300, 'y': 0, 'width': 100, 'height': 167}},
		{'name':'player_walk04', 'frame':{'x':400, 'y': 0, 'width': 100, 'height': 167}}
	]));

	player_stand = loadAnimation(new SpriteSheet('assets/player.png',
    	[{'name':'player_stand', 'frame':{'x':0, 'y': 0, 'width': 100, 'height': 167}}]));

	city_background = loadSpriteSheet('assets/city.png',
    	[{'name':'les_street.png', 'frame':{'x':0, 'y': 0, 'width': screenWidth, 'height': background_size}}]);
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	// Create the Player sprite and add it's animations
	player_sprite = createSprite(20, windowHeight - 83.5, 100, 167);
	player_sprite.addAnimation('walk', player_walk);
	player_sprite.addAnimation('stand', player_stand);
}

function draw() {
 	clear();
	background(0);

	/* Draw the ground tiles
	for (var x = 0; x < 840; x += 70) {
		tile_sprite_sheet.drawFrame('snow.png', x, 330);
	}*/

	// Draw the Background
	city_background.drawFrame('les_street.png', 0, 0);

	// Mobile friendly controls
	/*var eventX;
	if (isTouch()) {
		eventX = touchX;
	} else {
		eventX = mouseX;
	}*/

	//if mouse is to the left
	if(mouseX < player_sprite.position.x - 10) {
		player_sprite.changeAnimation('walk');
		// flip horizontally
    	player_sprite.mirrorX(-1);
		// move left
		player_sprite.velocity.x = -2;
	}
	else if(mouseX > player_sprite.position.x + 10) {
		player_sprite.changeAnimation('walk');
		// flip horizontally
		player_sprite.mirrorX(1);
		// move right
		player_sprite.velocity.x = 2;
	}
	else {
		player_sprite.changeAnimation('stand');
		//if close to the mouse, don't move
		player_sprite.velocity.x = 0;
	}

	//draw the sprite
	drawSprites();
}

function touchStarted() {
	touch_started = true;
}

function mouseMoved() {
	mouse_moved = true;
}

function isTouch() {
	return touch_started && !mouse_moved;
}