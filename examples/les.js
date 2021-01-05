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

function preload() {
  city = loadImage('assets/city.jpg');
}

function setup() {

  createCanvas(800,400);
  screenCenterX = 800/2;
  screenCenterY = 400/2;

  // Create the Player sprite and add it's animations
  player_sprite = createSprite(100, (400-100), 100, 167);
  player_sprite.addAnimation('walk', 'assets/player-walk01.png', 'assets/player-walk04.png');
  player_sprite.addAnimation('stand', 'assets/player-stand.png');


}

function draw() {
  background(0);

  viewPointFactor = 400 - city.height;
  viewPointEnd = city.width - screenCenterX;

  //Camera point view constrains
  if(player_sprite.position.x >= screenCenterX && player_sprite.position.x < viewPointEnd){
    camera.position.x = player_sprite.position.x;
  } else if(player_sprite.position.x > viewPointEnd) {
    camera.position.x = viewPointEnd;
  }
  
  door = createSprite((city.width-139), (400-120), 100, 167);
  door.shapeColor = color('rgba(0,0,0,0)');


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
  //patroling();

  image(city, 0, viewPointFactor);

  //camera.off();
  
  //p5.prototype.registerMethod('post', p5.prototype.drawSprites);
  drawSprites();

}