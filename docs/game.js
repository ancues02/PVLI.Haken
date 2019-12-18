import Prota from './Prota.js';
import Coin from './Coin.js';
import Spring from './Spring.js';
import BateriaDash from './BateriaDash.js';
import Rinne from './Rinne.js';
import Reizen from './Reizen.js';
import Gezi from './Gezi.js';
import Zoppo from './Zoppo.js'
import Shield from './Shield.js';
import changeMov from './changeMov.js'

//es la escena donde se juega
export default class Game extends Phaser.Scene {
  constructor() {
    super( 'Game' );
  }
  preload() { 
    //Imagenes Sprites
    this.load.image('espada', './sword2.png');
    this.load.image('espadaAtacando', './sword1.png');
    this.load.image('muelle', './muelle.png');
    this.load.image('zumito', './zumito.png');    //no es un zumo, es para resetear el dash
    this.load.image('bubble','./bubble.png');
    this.load.image('spike','./Spike.png');
    this.load.image('bloques', './PatronBloques.png');
    this.load.image('invertidor','./invertidor.png');

    //Spritesheets para animaciones
    this.load.spritesheet('personaje','./Fumiko.png',{frameWidth: 48, frameHeight: 61});
    this.load.spritesheet('coinAnim','./coin.png', { frameWidth: 46, frameHeight: 46 });
    this.load.spritesheet('enemiesSheet', './enemiesSheet.png',  { frameWidth: 46, frameHeight: 68});

    //Carga del .json
    this.load.tilemapTiledJSON("tilemap","./Mapa2.json");
    
    //Carga de audio
    this.load.audio('mainTheme', './Caves of sorrow.ogg');
    this.load.audio('jumpSound', './jump.wav');
    this.load.audio('attackSound', './attack.wav');
    this.load.audio('coinSound', './coin.wav');
    this.load.audio('playerDeathSound', './playerDeath.wav');
    this.load.audio('enemyDeathSound', './deadEnemy.wav');
    this.load.audio('dashSound', './dash.mp3');
    this.load.audio('pickUpSound', './pickUp.ogg')
    this.load.audio('changeSideSound', './changeSide.wav')
  }

  create() {   
    //Limites del juego
    this.limits = {
      top:0,
      down: 6400,
      left: 0,
      right: 1500      
    }
    this.dimMargin=730;//es la distancia que hay en cada lado
    this.escape=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);//Boton pausa

    //Creacion del mapa
    this.map = this.make.tilemap(
      {
      key:'tilemap',
      tileWidth:32,
      tileHeight:32,
      
    });
    this.map.addTilesetImage('TileMap','bloques');
    this.map.addTilesetImage('Pinchos','spike');


    //Layers del tilemap
    this.layerBackground=this.map.createDynamicLayer('Background','TileMap',0,0);
    this.layerNoChange=this.map.createDynamicLayer('NoChange','TileMap',0,0);
    this.layerSpike=this.map.createDynamicLayer('Pinchos','Pinchos',0,0);
    this.layerPlatform=this.map.createDynamicLayer('Plataformas','TileMap',0,0);
    //Configuracion de sonido
    let soundsConfig = {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    };
    let themeConfig = {
      mute: false,
      volume: 0.7,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    };
    this.mainTheme = this.sound.add('mainTheme', themeConfig);
    //this.menuTheme = this.sound.add('menuTheme', themeConfig);
    this.mainTheme.play();
    this.jumpSound = this.sound.add('jumpSound', soundsConfig );
    this.attackSound = this.sound.add('attackSound', soundsConfig );
    this.playerDeathSound = this.sound.add('playerDeathSound', soundsConfig);
    this.enemyDeathSound = this.sound.add('enemyDeathSound', soundsConfig);
    this.pickUpSound = this.sound.add('pickUpSound', soundsConfig);
    this.coinSound = this.sound.add('coinSound', soundsConfig);
    this.dashSound = this.sound.add('dashSound', soundsConfig);
    this.changeSideSound = this.sound.add('changeSideSound', soundsConfig);


//creamos las animaciones de los enemigos para que al instanciar un mismo enemigo no se cree la animacion mas de una vez
    this.zoppoAnim=this.anims.create({
      key: 'zoppoAnim',
      frames: this.anims.generateFrameNumbers('enemiesSheet', { start: 0, end: 2 }),
      frameRate: 2,
      repeat: -1
  });

  this.rinneAnim=this.anims.create({
    key: 'rinneAnim',
    frames: this.anims.generateFrameNumbers('enemiesSheet', { start: 3, end: 4}),
    frameRate: 3,
    repeat: -1
  });  

  this.reizenAnim=this.anims.create({ //esto no va en game, para no tenerlo cada vez que creamos uno
    key: 'reizenAnim',
    frames: this.anims.generateFrameNumbers('enemiesSheet', { start: 9, end: 10}),
    frameRate: 3,
    repeat: -1
  });
  this.geziAnim=this.anims.create({
    key: 'geziAnim',
    frames: this.anims.generateFrameNumbers('enemiesSheet', { start: 6, end: 7}),
    frameRate: 3,
    repeat: -1
  });
    this.player = new Prota (this, 200, 50, 300, {x:1, y:0}, 0, -350, 1,"personaje","espada","espadaAtacando","bubble");  //avatar del jugador

    //Creacion de enemigos
    this.enemiesGroup = this.add.group();
    this.enemiesGroupNoCollision= this.add.group();

    this.zoppo = new Zoppo (this, 1000, 350, 200, {x:1, y:0}, 10, 1, 1, this.enemiesGroup,"enemiesSheet",this.zoppoAnim);
    this.zoppo2 = new Zoppo (this, 100, 3050, 200, {x:1, y:0}, 10, 1, 1, this.enemiesGroup,"enemiesSheet",this.zoppoAnim);
    this.zoppo3 = new Zoppo (this, 600, 3050, 200, {x:1, y:0}, 10, 1, 1, this.enemiesGroup,"enemiesSheet",this.zoppoAnim);

    this.gezzi = new Gezi (this, 600, 3790, 200, {x:1, y:0}, 10, 1, 1, this.enemiesGroup,"enemiesSheet", this.geziAnim);

    this.rinne = new Rinne (this, 200, 2400, 500, {x:1, y:0}, 15, 1, 1, this.enemiesGroup,"enemiesSheet",this.rinneAnim);
    this.rinne2 = new Rinne (this, 1000, 3350, 500, {x:1, y:0}, 15, 1, 1, this.enemiesGroup,"enemiesSheet",this.rinneAnim);

    this.reizen = new Reizen (this, 600, 5500, 200, {x:1, y:0}, 20, 1, 1,this.enemiesGroupNoCollision,"enemiesSheet",this.reizenAnim);
    this.reizen2 = new Reizen (this, 1500, 5800, 200, {x:1, y:0}, 20, 1, 1,this.enemiesGroupNoCollision,"enemiesSheet",this.reizenAnim);

    //Creacion de pickUps
    this.coin1_1 = new Coin (this, 1050, 250,50, "coinAnim", this.coinSound);
    this.coin1_2 = new Coin (this, 1005, 1200,50, "coinAnim", this.coinSound);
    this.coin2_1 = new Coin (this, 140, 2100,50, "coinAnim", this.coinSound);
    this.coin2_2 = new Coin (this, 1100, 3020,50, "coinAnim", this.coinSound);
    this.coin3_1 = new Coin (this, 600, 3700,50, "coinAnim", this.coinSound);
    this.coin3_2 = new Coin (this, 150, 4000,50, "coinAnim", this.coinSound);
    this.coin4_1 = new Coin (this, 532, 5200,50, "coinAnim", this.coinSound);
    this.coin4_2 = new Coin (this, 1400,5750,50, "coinAnim", this.coinSound);
    this.shield = new Shield (this, 220, 600, "bubble",this.pickUpSound);
    this.invertidor=new changeMov(this,1250,4600,'invertidor',this.pickUpSound);  
    this.spring=new Spring(this,570,2630,"muelle",this.pickUpSound);
    this.resetDash = new BateriaDash (this, 250, 4100, "zumito", this.pickUpSound);


    //Configuracion de colisiones
    this.layerPlatform.setCollisionByProperty({ colision: true });
    this.physics.add.collider(this.player,this.layerPlatform);
    this.physics.add.collider(this.enemiesGroup, this.layerPlatform);
    

    //Configuracion de la interfaz
    this.time = 0;
    
    this.textDash=this.add.text(1350, this.player.getY());
    this.textDash.setFontSize(25);

    this.textScore = this.add.text(50, this.player.getY());
    this.textScore.setFontSize(25);
   
    this.textDepth = this.add.text(50, this.player.getY());
    this.textDepth.setFontSize(25);
    
    this.textTime = this.add.text(50, this.player.getY());
    this.textTime.setFontSize(25);

    this.textChange = this.add.text(1250, this.player.getY());
    this.textChange.setFontSize(25);

    //Configuracion de la camara
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setSize(1500,600);

  }

 
  //movemos los textos que estan en pantalla
  updateTexts(){
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
    if (this.player.canDash())  this.textDash.text = 'Dash: SI';
    else this.textDash.text = 'Dash: NO';

    this.textChange.y=(this.player.getY()-this.cameras.main.width/4+210);
    if (this.textChange.y<=30)this.textChange.y=30;
    if (this.textChange.y>=5830)this.textChange.y=5830;
    if (!this.player.canChange())  this.textChange.text = 'Change Side: SI';
    else this.textChange.text = 'Change Side: NO';
    
  }
  //hacemos que deje de detectar que estas pulsando ESC, pausamos la musica y cambiamos la escena
  managePause() {
    this.mainTheme.pause();
    this.escape.isDown=false;
    this.changeScene('Pause')
  }
  //cambiamos la escena al nombre que nos llegue
  changeScene(nameScene){
    this.scene.pause();
    this.scene.sendToBack();
    this.scene.run(nameScene);

  }
  //pone un texto que muestra tu puntuacion final ((puntos * (profundidad/10))/tiempo) 
  // y otro de si ganas o pierdes y luego cambiamos a la escena EndMenu
  endGame(finalScore){
    let win=false;
    let y=this.player.getY();
    if(y>6200){
      win=true;
      y=6000;
    } 
    this.textWin = this.add.text(400, y-100);
    if(win){
      this.textWin.text = 'You Win!!!';
    }
    else this.textWin.text = 'You Lose';
    this.textWin.setFontSize(100);
    this.textWin.setColor('#ffcc00');
    
    this.textFinalScore = this.add.text(400, y);
    this.textFinalScore.setFontSize(100);
    this.textFinalScore.setColor('#ffcc00');
    this.textFinalScore.text = 'Final Score ' + finalScore;

    this.mainTheme.stop();
    this.changeScene('EndMenu');
  }

  //actualizamos la posicion de la camara y los textos y lleva la pausa de la escena
  update(time, delta) { 
    if(this.mainTheme.isPaused) this.mainTheme.resume();//para resume la musica despues de menu pausa
    this.cameras.main.centerOnY( this.player.getY() + 100);  
    this.time += Math.round(delta);   
    this.updateTexts();
    if(this.escape.isDown){
      this.managePause();
    }
  
  }
}