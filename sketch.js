var PLAY = 1
var END = 2
var gameState = PLAY
var boulder1, boulder2
var player, playerImg
var obstacle, obstacleGroup
var obstacleImg, backgroundImg
var edge1, edge2, edge3, edge4

var position, position2, score
function preload(){
  playerImg = loadImage("deer.jpg")
  obstacleImg = loadAnimation("hunter1.png", "hunter2.png")
  backgroundImg = loadImage("forest.jpg")
}

function setup() {
  createCanvas(600,600)
  player = createSprite(300,300, 30, 30)
  player.addImage("paddle", playerImg)
  player.scale = 0.1
  obstacleGroup = new Group()
  edge1 = createSprite(0, 300, 5, 600)
  edge2 = createSprite(600, 300, 5, 600)
  edge3 = createSprite(300, 600, 600, 5)
  edge4 = createSprite(300, 0, 600, 5)

}

function draw() {
  background(backgroundImg)
  if(gameState===PLAY){
    if (keyDown("up")){
      player.y = player.y-10
    }
    if (keyDown("down")){
      player.y = player.y+10
    }
    if (keyDown("right")){
      player.x = player.x+10
    }
    if(keyDown("left")){
      player.x = player.x-10
    }
    createObstacles()
    if(player.isTouching(obstacleGroup)){
      obstacleGroup.destroyEach()
      player.destroy()
      gameState = END
    }
    score = Math.round(1+frameCount/25)
    stroke("black")
    fill("black")
    text("Score: "+score, 10, 30)
  }
  if(gameState === END){
    stroke("red")
    fill("red")
    textSize(50)
    textAlign(CENTER)
    text("Game Over", player.x, player.y)
  }
  camera.position.x = player.x
  camera.position.y = player.y
  player.collide(edge1)
  player.collide(edge2)
  player.collide(edge3)
  player.collide(edge4)
  drawSprites();
}

function createObstacles() {

  
  if (frameCount % 20 === 0){
    position = Math.round(random(1,4))
    position2 = Math.round(random(0,600))
    obstacle = createSprite(400, 300, 45, 45)
    obstacle.addAnimation("obstacleImg", obstacleImg)
    obstacle.scale = 0.5
    if(position === 1){
      obstacle.x = 0
      obstacle.velocityX = 5
      obstacle.y = position2
    } else if(position === 2){
      obstacle.x = 600
      obstacle.velocityX = -(5)
      obstacle.y = position2
    } else if (position === 3){
      obstacle.y = 600
      obstacle.velocityY = -5
      obstacle.x = position2
    } else if (position === 4){
      obstacle.y = 0
      obstacle.velocityY = 5
      obstacle.x = position2
    }
    
    obstacleGroup.add(obstacle)
  }
}