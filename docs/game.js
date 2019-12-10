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
import Spike from './Spike.js';
import changeMov from './changeMov.js'
//import Contenerdor from './Contenedor.js';
export default class Game extends Phaser.Scene {
  constructor() {
    super( 'Game' );
  }


  preload() { 
  
  this.load.image('personaje','./favicon.png');
  this.load.image('shield','./shield.png');
  this.load.image('coin', './1coin.png');
     this.load.image('espada', './sword2.png');
     this.load.image('espadaAtacando', './sword1.png');
     this.load.image('enemigo', './Enemy.png');
     this.load.image('enemigo2', './enemy2.png');
     this.load.image('enemigo3', './Enemy3.1.png');
     this.load.image('muelle', './muelle.png');
     this.load.image('zumito', './zumito.png');
     this.load.image('bubble','./bubble.png')
     this.load.image('spike','./Spike.png')

     //var platforms =this.physics.add.staticGroup();;
     this.load.image ('tile','./Sprute.png')

     this.load.tilemapTiledJSON("tilemapp","./Mapa.json")
     //this.load.tilemapTiledJSON("pinchos","./Mapa.json")
     this.load.spritesheet('coinAnim','coin.png', { frameWidth: 64, frameHeight: 64 });

  }

  create() {
    this.map = this.make.tilemap(
      {
      key:'tilemapp',
      tileWidth:32,
      tileHeight:32,
      
    });
    this.map.addTilesetImage('TileMap','tile');
    //this.map.addTilesetImage('Spike','spike');
    this.layerBackground=this.map.createDynamicLayer('Background','TileMap',0,0);
    this.layerPlatform=this.map.createDynamicLayer('Plataformas','TileMap',0,0);
    this.layerSpike=this.map.createDynamicLayer('Pinchos','TileMap',0,0);

    this.escape=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);//boton pausa
    this.player = new Prota (this, 450, 200, 300, {x:1, y:0}, 0, -350, 1,"personaje","espada","espadaAtacando","bubble");
    this.enemiesGroup = this.add.group();
    //this.spikeGroup=this.add.group();
    //this.add.sprite(200, 360, 'coinAnim');
    

    this.enemigo = new Zoppo (this, 600, 700, 200, {x:1, y:0}, 2, 1, 1, this.enemiesGroup,"enemigo");
    this.enemigo1 = new Rinne (this, 230, 1250, 500, {x:1, y:0}, 2, 1, 1, this.enemiesGroup,"enemigo2");
    this.enemigo2 = new Zoppo (this, 1400, 400, 200, {x:1, y:0}, 2, 1, 1,this.enemiesGroup,"enemigo");
    this.enemigo3 = new Rinne (this, 1230, 600, 200, {x:1, y:0}, 2, 1, 1,this.enemiesGroup,"enemigo3");


    this.coin = new Coin (this, 600, 300, "coinAnim");

    this.shield = new Shield (this, 300, 600, "shield");
    this.spring = new Spring(this, 1300, 650, "muelle");
    this.bateriaDash = new BateriaDash(this, 500, 960, "zumito");

    //this.spike=new Spike(this,300,600,"spike");
    
    this.layerPlatform.setCollisionByProperty({ colision: true });
    this.physics.add.collider(this.player,this.layerPlatform);
    this.physics.add.collider(this.enemiesGroup, this.layerPlatform);
    //this.physics.add.collider(this.spike, this.player);
    // this.physics.add.collider(this.enemigo,this.layerPlatform);
    // this.physics.add.collider(this.enemigo2,this.layerPlatform);
    // this.physics.add.collider(this.enemigo1,this.layerPlatform);
    // this.physics.add.collider(this.enemigo3,this.layerPlatform);

    this.time = 0;


    
    
    this.textDash=this.add.text(this.cameras.main.left, this.player.getY());
    this.textDash.setFontSize(25);
    this.textDash.x=1350;

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

    this.textDash.y=(this.player.getY()-this.cameras.main.width/4+180);
    if (this.textDash.y<=0)this.textDash.y=0;
    this.textDash.text = 'Dash: ' + this.player.canDash();
   
}
managePause() {
  //console.log(this.scene.isActive('Game'));
    
   
  this.scene.pause();
  this.scene.sendToBack();
  //console.log(this.scene.isPaused('Game'));
  this.scene.run('Pause');

  
  this.escape.isDown=false;//para que no detecte que estas pulsando escape

}

changeScene(nameScene){
  this.scene.stop();

  this.scene.start(nameScene);

}

  update(time, delta) { 
    //console.log("pos X "+this.player.getX() + "pos Y "+Math.round(this.player.getY()))
    this.cameras.main.centerOnY( this.player.getY() + 100);  
    this.cameras.main.setSize(1500,600);
    this.time += Math.round(delta); 
    
    this.updateScore();
    
    
    if(this.escape.isDown){
      this.managePause();

    }
  }
}