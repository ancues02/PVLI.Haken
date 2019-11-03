import Player from './Player.js';
import Plataformas from './Plataformas.js';
import PickMe from './PickMe.js';
export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() { 
     this.load.image('personaje','favicon.png');
     this.load.image('plataforma','platform.jfif');
     this.load.image('plataforma2','platformGirada.jfif');
     this.load.image('muroCentral','divCentral.png');
     this.load.image('muroCentral','divCentral.png');
     this.load.image('platHor','platHorizontal.png');
     this.load.image('pickUp', 'SPRITE.jpg');
     //var platforms =this.physics.add.staticGroup();;

  }

  create() {
    //this.add.image(400, 300, 'plataforma');
    this.player = new Player (this, 500, 200, "personaje");
    this.pickUp = new PickMe (this, 1000, 300, "pickUp");
    //this.add.existing(Personaje);
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

  update(time, delta) {    
  }
}