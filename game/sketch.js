var player_sprite_sheet;
var player_walk;
var player_stand;
var player_sprite;
var policeman_sprite_sheet;
var policeman_patrol;
var policeman_sprite;
var viewPointFactor;
var viewPointEnd;
var screenCenterX;
var screenCenterY;
var city;
var door;
let game_level = 0;
/*
var player_frames = [
  {'name':'player_walk01', 'frame':{'x':100, 'y': 0, 'width': 100, 'height': 167}},
  {'name':'player_walk02', 'frame':{'x':200, 'y': 0, 'width': 100, 'height': 167}},
  {'name':'player_walk03', 'frame':{'x':300, 'y': 0, 'width': 100, 'height': 167}},
  {'name':'player_walk04', 'frame':{'x':400, 'y': 0, 'width': 100, 'height': 167}}
];

var policeman_frames = [
  {'name':'policeman_patrol01', 'frame':{'x':360, 'y': 0, 'width': 120, 'height': 171}},
  {'name':'policeman_patrol02', 'frame':{'x':240, 'y': 0, 'width': 120, 'height': 171}},
  {'name':'policeman_patrol03', 'frame':{'x':120, 'y': 0, 'width': 120, 'height': 171}},
  {'name':'policeman_patrol04', 'frame':{'x':0, 'y': 0, 'width': 120, 'height': 171}}
];
*/

function preload() {
  city = loadImage('assets/city.jpg');
}

function setup() {

  //player_sprite_sheet = loadSpriteSheet('assets/player.png', player_frames);
  //player_walk = loadAnimation(player_sprite_sheet);
  //player_stand = loadAnimation(new SpriteSheet('assets/player.png',
    //[{'name':'player_stand', 'frame':{'x':0, 'y': 0, 'width': 100, 'height': 167}}]));

  //policeman_sprite_sheet = loadSpriteSheet('assets/policeman.png', policeman_frames);
  //policeman_patrol = loadAnimation(policeman_sprite_sheet);

  createCanvas(windowWidth,windowHeight);
  screenCenterX = windowWidth/2;
  screenCenterY = windowHeight/2;

  // Create the Player sprite and add it's animations
  player_sprite = createSprite(100, (windowHeight-100), 100, 167);
  player_sprite.addAnimation('walk', 'assets/player-walk01.png', 'assets/player-walk04.png');
  player_sprite.addAnimation('stand', 'assets/player-stand.png');

  // Create the Policeman sprite and add it's animations
  //policeman_sprite = createSprite((windowWidth+screenCenterX), (windowHeight-105), 120, 171);
  //policeman_sprite.addAnimation('patrol', policeman_patrol);

}

function draw() {
  background(0);

  viewPointFactor = windowHeight - city.height;
  viewPointEnd = city.width - screenCenterX;

  //Camera point view constrains
  if(player_sprite.position.x >= screenCenterX && player_sprite.position.x < viewPointEnd){
    camera.position.x = player_sprite.position.x;
  } else if(player_sprite.position.x > viewPointEnd) {
    camera.position.x = viewPointEnd;
  }
  
  //Scenes
  switch (game_level) {
    case 0:
      streetScene();
      break;
    case 1:
      player_sprite.visible = false;
      //policeman_sprite.visible = false;
      inTheBar();
      break;
    case 2:
      player_sprite.visible = false;
      policeman_sprite.visible = false;
      break;
  }

  //camera.off();
  
  //p5.prototype.registerMethod('post', p5.prototype.drawSprites);
  drawSprites();

}

function streetScene() {
  door = createSprite((city.width-139), (windowHeight-120), 100, 167);
  door.shapeColor = color('rgba(0,0,0,0)');


  movePlayer();
  //patroling();

  image(city, 0, viewPointFactor);

  if(player_sprite.collide(door)) {
    game_level = 1;
  }
}

function inTheBar() {
  fill(250);
  textAlign(CENTER);
  textSize(24);
  text('You are in the bar', 200, height/2);

  if(keyDown('SPACE') || mouseIsPressed) {
    player_sprite.position.x = door.position.x - 200;
    game_level = 0;
  }
}

function patroling() {
  if(policeman_sprite.position.x > (windowWidth+screenCenterX-2)){
    policeman_sprite.mirrorX(1);
    policeman_sprite.velocity.x = -2;
  } else if(policeman_sprite.position.x < (screenCenterX*1.5)){
    policeman_sprite.mirrorX(-1);
    policeman_sprite.velocity.x = 2;
  }
}

function movePlayer() {
  player_sprite.visible = true;
  //policeman_sprite.visible = true;

  //Move the player
  if(mouseIsPressed && mouseX >= screenCenterX || keyDown('RIGHT_ARROW')){
    player_sprite.changeAnimation('walk');
    player_sprite.mirrorX(1);
    player_sprite.velocity.x = 4;
  }
  else if(mouseIsPressed && mouseX <= screenCenterX || keyDown('LEFT_ARROW')){
    player_sprite.changeAnimation('walk');
    player_sprite.mirrorX(-1);
    player_sprite.velocity.x = -4;
  }
  else {
    player_sprite.changeAnimation('stand');
    player_sprite.velocity.x = 0;
  }
}