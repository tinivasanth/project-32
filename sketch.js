const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2;
var blower;
var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var shelf;
var buttons;
var bubbles;
var bubbleImg;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  bubbleImg=loadImage("Bubble-removebg-preview.png")
  //bk_song = loadSound('sound1.mp3');
  //sad_sound = loadSound("sad.wav")
  //cut_sound = loadSound('rope_cut.mp3');
  //eating_sound = loadSound('eating_sound.mp3');
 // air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,800);

  frameRate(80);

  //bk_song.play();
  //bk_song.setVolume(0.1);

  engine = Engine.create();
  world = engine.world;


  var fruit_options = {
    restitution: 0.8
  }

   fruit = Bodies.circle(100,400,15,fruit_options);
   World.add(world,fruit);
   ground = new Ground(250,height-10,width,20);

   shelf = new Ground(300,170,100,10);

   bubbles = createSprite(280,580,100,100);
   
   bubbles.addImage("bubble",bubbleImg);
   bubbles.scale=0.2;

   blink.frameDelay = 20;
   eat.frameDelay = 20;

   bunny = createSprite(300,100,100,100);
   bunny.addImage(rabbit);
   bunny.scale = 0.2;
 
   bunny.addAnimation('blinking',blink);
   bunny.addAnimation('eating',eat);
   bunny.addAnimation('crying',sad);
   bunny.changeAnimation('blinking');

   rope = new Rope(4,{x:230,y:330});
   rope2 = new Rope(4,{x:50,y:450});

   fruit_con = new Link(rope,fruit);
   fruit_con_2 = new Link(rope2,fruit);

  //createSprite(400, 200, 50, 50);
//btn 1
  button = createImg('cut_btn.png');
  button.position(200,320);
  button.size(50,50);
  button.mouseClicked(drop2);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(30,420);
   button2.size(60,60);
   button2.mouseClicked(drop);

   blower = createImg('balloon.png');
   blower.position(100,170);
   blower.size(100,100);
   blower.mouseClicked(airblow)
   Matter.Composite.add(rope.body,fruit);
 
   
  // fruit_con_3 = new Link(rope3,fruit);
 
   rectMode(CENTER);
   ellipseMode(RADIUS);
   textSize(50)
   
}
function draw() {
  background(51);
  
  image(bg_img,0,0,width,height);
  //image(bg_img,0,0,canW+80,canH);
  
  Engine.update(engine);
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();
  ground.show();
  shelf.show();
  rope.show();
  rope2.show();
  
  
  
  
  if (collide(fruit,bunny,80)==true){

    //drop();
   bubbles.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
}
if(collide(fruit,bubbles,40) == true)
    {
      engine.world.gravity.y = -1;
      bubbles.position.x = fruit.position.x;
      bubbles.position.y = fruit.position.y;
    }
  drawSprites();
}
function drop()
{
  //cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
   
}

function drop2()
{
  //cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}




function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              //World.remove(engine.world,fruit);
              
               return true; 
            }
            else{
              return false;
            }
         }
}

function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  air.play()
}
/*function collision(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=20)
            {
              World.remove(engine.world,fruit);
              // fruit = null;
              
               return true; 
            }
            else{
              return false;
            }
         }
}*/




