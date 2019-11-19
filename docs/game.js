//import Personaje from './Personaje.js';
import Prota from './Prota.js';
//import PickMe from './PickMe.js';
import Coin from './Coin.js';
import Spring from './Spring.js';
import BateriaDash from './BateriaDash.js';
import Rinne from './Rinne.js';
import Reizen from './Reizen.js';
import Zoppo from './Zoppo.js'
import Menu from './Menu.js';
export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
    
  }


  preload() { 
     this.load.image('personaje','./favicon.png');
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
    this.player = new Prota (this, 450, 200, 300, {x:1, y:0}, 0, -350, 1,"personaje","espada");
    this.enemigo = new Zoppo (this, 600, 700, 200, {x:1, y:0}, 2, 1, 1,"enemigo");
    this.enemigo1 = new Rinne (this, 230, 1250, 500, {x:1, y:0}, 2, 1, 1,"enemigo2");

    this.coin = new Coin (this, 300, 600, "pickUp");
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
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    //this.menu=new Menu(this);


  }
  updateScore(){
    //console.log(this.textScore.y);
    this.textScore.y=(this.player.getY()-this.cameras.main.width/4+170);
    if (this.textScore.y<=0)this.textScore.y=0;
    this.textScore.text = 'Score: ' + this.player.getPoints();

}
  update(time, delta) {  
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
  }
}