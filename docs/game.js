//import Personaje from './Personaje.js';
import Prota from './Prota.js';
//import PickMe from './PickMe.js';
import Coin from './Coin.js';
import Spring from './Spring.js';
import BateriaDash from './BateriaDash.js';
import Rinne from './Rinne.js';
import Reizen from './Reizen.js';
import Gezi from './Gezi.js';
import Zoppo from './Zoppo.js'
import Shield from './Shield.js';
import Spike from './Spike.js';//pinchos
import changeMov from './changeMov.js'//invierte los controles
//import Contenerdor from './Contenedor.js';
export default class Game extends Phaser.Scene {
  constructor() {
    super( 'Game' );
  }


  preload() { 
    //Imagenes Sprites
    this.load.image('shield','./shield.png');
    //this.load.image('coin', './1coin.png');
    this.load.image('espada', './sword2.png');
    this.load.image('espadaAtacando', './sword1.png');
    this.load.image('enemigo', './Enemy.png');
    this.load.image('enemigo2', './enemy2.png');
    this.load.image('enemigo3', './Enemy3.1.png');
    this.load.image('enemigo4', './ghost.png');
    this.load.image('muelle', './muelle.png');
    this.load.image('zumito', './zumito.png');
    this.load.image('bubble','./bubble.png');
    this.load.image('spike','./Spike.png');
    this.load.image('bloques', './PatronBloques.png');

    //Imagenes Tilesets
    this.load.image ('tile','./Sprute.png');  
    this.load.image ('tile2','./atlas2.png');

    //Spritesheets para animaciones
    this.load.spritesheet('personaje','./Fumiko.png',{frameWidth: 48, frameHeight: 61});
    this.load.spritesheet('coinAnim','./coin.png', { frameWidth: 46, frameHeight: 46 });

    //Carga del .json
    this.load.tilemapTiledJSON("tilemap","./Mapa2.json");
    //this.load.tilemapTiledJSON("pinchos","./Mapa.json")
    
    //Carga de audio
    this.load.audio('mainTheme', './Caves of sorrow.ogg');
  }

  create() {     
    this.escape=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);//Boton pausa

    //Creacion del tilemap
    this.map = this.make.tilemap(
      {
      key:'tilemap',
      tileWidth:32,
      tileHeight:32,
      
    });
    // this.map.addTilesetImage('TileMap','tile');
    // this.map.addTilesetImage('TileMap2','tile2');
    // this.map.addTilesetImage('Pinchos','spike');

    this.map.addTilesetImage('TileMap','bloques');


    //this.spikeGroup=this.add.group();
    //Layers del tilemap
    this.layerBackground=this.map.createDynamicLayer('Background','TileMap',0,0);
    this.layerNoChange=this.map.createDynamicLayer('NoChange','TileMap',0,0);
    this.layerSpike=this.map.createDynamicLayer('Pinchos','TileMap',0,0);
    this.layerPlatform=this.map.createDynamicLayer('Plataformas','TileMap',0,0);
    //this.map.createFromObjects('Pinchos', 0,true, this.spikeGroup);
    //200 50
    this.player = new Prota (this, 200, 50, 300, {x:1, y:0}, 0, -350, 1,"personaje","espada","espadaAtacando","bubble");  //avatar del jugador

    //Creacion de enemigos
    this.enemiesGroup = this.add.group();
    this.enemiesGroupNoCollision= this.add.group();
    //this.spikeGroup=this.add.group();
    //this.add.sprite(200, 360, 'coinAnim');
    //this.layerSpike.setTileIndexCallback(1,this.col() , this.player);


    this.zoppo = new Zoppo (this, 1000, 350, 200, {x:1, y:0}, 2, 1, 1, this.enemiesGroup,"enemigo");
    this.zoppo2 = new Zoppo (this, 100, 3050, 200, {x:1, y:0}, 2, 1, 1, this.enemiesGroup,"enemigo");
    this.zoppo3 = new Zoppo (this, 600, 3050, 200, {x:1, y:0}, 2, 1, 1, this.enemiesGroup,"enemigo");
    /*Esto seria un gezi*/this.zoppo4 = new Zoppo (this, 600, 3790, 200, {x:1, y:0}, 2, 1, 1, this.enemiesGroup,"enemigo");

    this.rinne = new Rinne (this, 200, 2400, 500, {x:1, y:0}, 2, 1, 1, this.enemiesGroup,"enemigo2");
    this.rinne2 = new Rinne (this, 1000, 3350, 500, {x:1, y:0}, 2, 1, 1, this.enemiesGroup,"enemigo2");


    this.reizen = new Reizen (this, 600, 5500, 200, {x:1, y:0}, 2, 1, 1,this.enemiesGroupNoCollision,"enemigo4");
    this.reizen2 = new Reizen (this, 1500, 5800, 200, {x:1, y:0}, 2, 1, 1,this.enemiesGroupNoCollision,"enemigo4");

    //this.enemigo3 = new Gezi (this, 660, 3810, 200, {x:1, y:0}, 2, 1, 1,this.enemiesGroup,"enemigo3"); gezi falla, puede ser la posicion

    //Creacion de pickUps
    this.coin1_1 = new Coin (this, 1050, 250, "coinAnim");
    this.coin1_2 = new Coin (this, 1005, 1200, "coinAnim");
    this.coin2_1 = new Coin (this, 140, 2100, "coinAnim");
    this.coin2_2 = new Coin (this, 1100, 3020, "coinAnim");
    this.coin3_1 = new Coin (this, 600, 3700, "coinAnim");
    this.coin3_2 = new Coin (this, 150, 4000, "coinAnim");
    this.coin4_1 = new Coin (this, 532, 5200, "coinAnim");
    this.coin4_2 = new Coin (this, 1400,5750, "coinAnim");

    this.shield = new Shield (this, 300, 600, "shield");
    //this.spring = new Spring(this, 1300, 650, "muelle");
    //this.bateriaDash = new BateriaDash(this, 500, 960, "zumito");

    //this.spike=new Spike(this,300,600,"spike");
    
    //Configuracion de colisiones
    this.layerPlatform.setCollisionByProperty({ colision: true });
    //console.log(this.map.getTileProperties);
    this.physics.add.collider(this.player,this.layerPlatform);
    this.physics.add.collider(this.enemiesGroup, this.layerPlatform);
    //this.physics.add.collider(this.spike, this.player);
    // this.physics.add.collider(this.enemigo,this.layerPlatform);
    // this.physics.add.collider(this.enemigo2,this.layerPlatform);
    // this.physics.add.collider(this.enemigo1,this.layerPlatform);
    // this.physics.add.collider(this.enemigo3,this.layerPlatform);

    

    //Configuracion de la interfaz
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

    this.textChange = this.add.text(this.cameras.main.left, this.player.getY());
    this.textChange.setFontSize(25);
    this.textChange.x=1250;

    //Configuracion de la camara
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setSize(1500,600);

    //Configuracion de sonido
    this.mainTheme = this.sound.add('mainTheme', {
      mute: false,
      volume: 0.7,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    } );
    this.mainTheme.play();
  }

 
  
  updateScore(){
    //console.log(this.textScore.y);
    this.textScore.y=(this.player.getY()-this.cameras.main.width/4+170);
    if (this.textScore.y<=0)this.textScore.y=0;
    if (this.textScore.y>=5800)this.textScore.y=5800;    
    this.textScore.text = 'Score: ' + this.player.getPoints();

    this.textDepth.y=(this.player.getY()-this.cameras.main.width/4+200);
    if (this.textDepth.y<=30)this.textDepth.y=30;
    if (this.textDepth.y>=5830)this.textDepth.y=5830;
    this.textDepth.text = 'Depth: ' + Math.round(this.player.y);
    
    this.textTime.y=(this.player.getY()-this.cameras.main.width/4+230);
    if (this.textTime.y<=60)this.textTime.y=60;
    if (this.textTime.y>=5860)this.textTime.y=5860;
    this.textTime.text = 'Time: ' + Math.round(this.time/1000);

    this.textDash.y=(this.player.getY()-this.cameras.main.width/4+180);
    if (this.textDash.y<=0)this.textDash.y=0;
    if (this.textDash.y>=5800)this.textDash.y=5800;
    this.textDash.text = 'Dash: ' + this.player.canDash();

    this.textChange.y=(this.player.getY()-this.cameras.main.width/4+210);
    if (this.textChange.y<=30)this.textChange.y=30;
    if (this.textChange.y>=5830)this.textChange.y=5830;
    this.textChange.text = 'Change Side: ' + this.player.canChange();
    
}

managePause() {
  //console.log(this.scene.isActive('Game'));
  /*0.this.pausescene=this.scene.getScene('Pause');
  this.pausescene.UpdateScore(10);*/
   
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

addText(){//pone un texto que muestra tu puntuacion final ((puntos * (profundidad/10))/tiempo) 
  this.textFinalScore = this.add.text(this.cameras.main.left, this.player.getY());
  this.textFinalScore.setFontSize(100);
  this.textFinalScore.x=400;
  this.textFinalScore.y=this.player.getY()-this.cameras.main.width/4+330;
  this.textFinalScore.text = 'Final Score ' + this.player.getFinalScore();
}

  update(time, delta) { 
    
    this.cameras.main.centerOnY( this.player.getY() + 100);  

    this.time += Math.round(delta); 
    
    this.updateScore();
    
    
    if(this.escape.isDown){
      this.managePause();

    }
  }
}