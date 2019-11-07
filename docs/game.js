//import Personaje from './Personaje.js';
import Prota from './Prota.js';
import Plataformas from './Plataformas.js';
import PickMe from './PickMe.js';
//import Prota from './Prota.js';
export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() { 
     this.load.image('personaje','..//images//favicon.png');
     this.load.image('plataforma','..//images//platform.jfif');
     this.load.image('plataforma2','..//images//platformGirada.jfif');
     this.load.image('muroCentral','..//images//divCentral.png');
     this.load.image('muroCentral','..//images//divCentral.png');
     this.load.image('platHor','..//images//platHorizontal.png');
     this.load.image('pickUp', '..//images//SPRITE.jpg');
     this.load.image('espada', '..//images//espada.png');
     
     //var platforms =this.physics.add.staticGroup();;
     this.load.image ('tile','..//images//Sprute.png')

     this.load.tilemapTiledJSON("tilemap","..//Map//Mapa.json")

  }

  create() {
    this.map = this.make.tilemap(
      {
      key:'tilemap',
      tileWidth:32,
      tileHeight:32,
      
    });
    this.map.addTilesetImage('TileMap','tile');
    this.map.createDynamicLayer('Plataformas','TileMap',0,0);
    //Plataformas.setCollisionByProperty({solido:true});
    //Plataformas.setCollisionByProperty({ colision: true });
    //this.physics.add.collider(this.player,colision);
    
    /*this.contenedor = new Phaser.GameObjects.Container(this, 500, 200); // Martian es un Sprite
    this.b = this.add.sprite(50, 0,"pickUp");
    this.add.existing(this.b);
    //this.physics.add.existing(this.contenedor);

  //this.contenedor.body.collideWorldBounds=true;
    this.contenedor.add(this.b); // hacemos que `b` sea hijo de `a`
   // this.b.y = 10; // relativo a `a`
    this.add.existing(this.contenedor);*/

    this.player = new Prota (this, 50, 0, 500, {x:1, y:0}, 0, -350, "personaje","espada");
    //this.contenedor.add(this.player);
    this.pickUp = new PickMe (this, 1000, 300, "pickUp");
    //this.prota = new Prota (this, 500, 200, "personaje");

    this.textScore = this.add.text(this.cameras.main.left, this.player.getY());
    this.textScore.setFontSize(25);
    //this.platforms = this.physics.add.staticGroup();
    //new Plataformas(this,this.player, this.platforms,500,400,90);
    //platforms=this.physics.add.staticGroup();
    // let platforms;
    this.platforms =this.add.group();
    new Plataformas (this,this.player, this.platforms,500, 600, "platHor");
    new Plataformas (this,this.player, this.platforms,150, 700, "platHor");
    new Plataformas (this,this.player, this.platforms,1250, 700, "platHor");
    new Plataformas (this,this.player, this.platforms,900, 600, "platHor");
    new Plataformas (this,this.player, this.platforms,700, 400, "muroCentral");
    new Plataformas (this,this.player, this.platforms,0, 410, "muroCentral");
    new Plataformas (this,this.player, this.platforms,1400, 400, "muroCentral");

    // //platforms.create(400,568,'plataforma').setScale(2).refreshBody();
    //this.platforms.create(300, 400, 'plataforma');
    //this.platforms.create(500, 20, 'plataforma');
    // platforms.create(700, 400, 'plataforma2');
    //this.physics.add.collider(this.player, this.platforms)
    //let Plataforma=new Plataformas (this, 700,600,"plataforma");
    //platforms = this.physics.add.staticGroup();
    //platform=this.physics.add.staticGroup();
    //platforms.create(400,568,'platform.jfif').setScale(2).refreshBody();
  }
  updateScore(){

    this.textScore.y=(this.player.getY()-this.cameras.main.width/4);
    this.textScore.text = 'Score: ' + this.player.getPoints();

}
  update(time, delta) {  
    this.cameras.main.centerOnY( this.player.getY());
    console.log(this.cameras.main.height);
    this.cameras.main.setSize(1400,500);

    //this.cameras.main.setBounds(0,0,10,10);
    //this.contenedor.x = this.player.getX();
    //this.contenedor.y = this.player.getY();

    /*console.log(this.player.x);
    console.log(this.contenedor.x+"contenedor");
    console.log(this.b.x);*/



    this.updateScore();
  }
}