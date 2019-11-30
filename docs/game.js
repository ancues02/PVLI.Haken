//import Personaje from './Personaje.js';
import Prota from './Prota.js';
//import PickMe from './PickMe.js';
import Coin from './Coin.js';
import Spring from './Spring.js';
import BateriaDash from './BateriaDash.js';
import Rinne from './Rinne.js';
import Reizen from './Reizen.js';
import Zoppo from './Zoppo.js'
import Shield from './Shield.js';
export default class Game extends Phaser.Scene {
  constructor() {
    super( 'Game' );
  }


  preload() { 
  //   this._fontStyle = { 
  //     font: "40px Arial", 
  //     fill: "#FFCC00", 
  //     stroke: "#333", 
  //     strokeThickness: 5, 
  //     align: "center"
  // };
  this.load.image('personaje','./favicon.png');
  this.load.image('shield','./shield.png');
  this.load.image('pickUp', './coin.png');
     this.load.image('espada', './espada.png');
     this.load.image('enemigo', './Enemy.png');
     this.load.image('enemigo2', './enemy2.png');
     this.load.image('muelle', './muelle.png');
     this.load.image('zumito', './zumito.png');

     //var platforms =this.physics.add.staticGroup();;
     this.load.image ('tile','./Sprute.png')

     this.load.tilemapTiledJSON("tilemap","./Mapa.json")

  }

  create() {
    //this.escape2=this.input.keyboard.addKey("Q"); //tecla del dash

    this.escape=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);//boton pausa
    this.player = new Prota (this, 450, 200, 300, {x:1, y:0}, 0, -350, 1,"personaje","espada","shield");
    this.enemigo = new Zoppo (this, 600, 700, 200, {x:1, y:0}, 2, 1, 1,"enemigo");
    this.enemigo1 = new Rinne (this, 230, 1250, 500, {x:1, y:0}, 2, 1, 1,"enemigo2");

    this.shield = new Shield (this, 300, 600, "shield");
    this.spring = new Spring(this, 1300, 650, "muelle");
    this.bateriaDash = new BateriaDash(this, 500, 960, "zumito");

    this.map = this.make.tilemap(
      {
      key:'tilemap',
      tileWidth:32,
      tileHeight:32,
      
    });
    this.map.addTilesetImage('TileMap','tile');
    this.layer=this.map.createDynamicLayer('Plataformas','TileMap',0,0);
    this.layer.setCollisionByProperty({ colision: true });
    this.physics.add.collider(this.player,this.layer);
    this.physics.add.collider(this.enemigo,this.layer);
    this.physics.add.collider(this.enemigo1,this.layer);
    this.time = 0;


    
    
    /*this.contenedor = new Phaser.GameObjects.Container(this, 500, 200); // Martian es un Sprite
    this.b = this.add.sprite(50, 0,"pickUp");
    this.add.existing(this.b);
    //this.physics.add.existing(this.contenedor);

  //this.contenedor.body.collideWorldBounds=true;
    this.contenedor.add(this.b); // hacemos que `b` sea hijo de `a`
   // this.b.y = 10; // relativo a `a`
    this.add.existing(this.contenedor);*/

    //this.contenedor.add(this.player);
    

    this.textScore = this.add.text(this.cameras.main.left, this.player.getY());
    this.textScore.setFontSize(25);
    this.textScore.x=50;
   
    this.textDepth = this.add.text(this.cameras.main.left, this.player.getY());
    this.textDepth.setFontSize(25);
    this.textDepth.x=50;
    
    this.textTime = this.add.text(this.cameras.main.left, this.player.getY());
    this.textTime.setFontSize(25);
    this.textTime.x=50;

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


  }
  
  updateScore(){
    //console.log(this.textScore.y);
    this.textScore.y=(this.player.getY()-this.cameras.main.width/4+170);
    if (this.textScore.y<=0)this.textScore.y=0;
    this.textScore.text = 'Score: ' + this.player.getPoints();

    this.textDepth.y=(this.player.getY()-this.cameras.main.width/4+200);
    if (this.textDepth.y<=30)this.textDepth.y=30;
    this.textDepth.text = 'Depth: ' + Math.round(this.player.y);
    
    this.textTime.y=(this.player.getY()-this.cameras.main.width/4+230);
    if (this.textTime.y<=60)this.textTime.y=60;
    this.textTime.text = 'Time: ' + Math.round(this.time/1000);
   
}
managePause() {
  //console.log(this.scene.isActive('Game'));
    
   
    
  this.scene.pause();
  //console.log(this.scene.isPaused('Game'));

  this.scene.resume('Pause');

}

changeScene(nameScene){
  this.scene.stop();

  this.scene.start(nameScene);

}

  update(time, delta) { 
     this.time += Math.round(delta); 
    //console.log(this.scene.isPaused());

    /*this.q.on('up',function (event){
      console.log("pulsa q");

        this.paused = true;
        //this.scene.add.text(300, 300, 'Start!', { fill: '#0f0' });
        //this.pausedText = this.add.text(100, 250, "Game paused.\nTap anywhere to continue.", { fill: '#0f0' });
        this.input.onDown.add(function(){
        //this.pausedText.destroy();
        this.game.paused = false;
  }, this);
    // });*/
   
   
      this.cameras.main.centerOnY( this.player.getY() + 100);
      //console.log(this.player.y+" playern");
  
      //console.log(this.cameras.main.height);
      this.cameras.main.setSize(1500,600);
  
      //this.cameras.main.setBounds(0,0,10,10);
      //this.contenedor.x = this.player.getX();
      //this.contenedor.y = this.player.getY();
      /*console.log(this.player.x);
      console.log(this.contenedor.x+"contenedor");
      console.log(this.b.x);*/
  
  
  
      this.updateScore();
    
    
    if(this.escape.isDown){
      //console.log("hols");
      this.managePause();

    }
  }
}