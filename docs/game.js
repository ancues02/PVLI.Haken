import Player from './Player.js';
import Plataformas from './Plataformas.js';
export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() { 
     this.load.image('personaje','favicon.png')
     this.load.image('plataforma','platform.jfif')
     var platforms;

  }

  create() {
    //this.add.image(400, 300, 'plataforma');
    let Personaje = new Player (this, 700, 500, "personaje");
    this.add.existing(Personaje);
    let Plataforma=new Plataformas (this, 700,600,"plataforma");
    //platforms = this.physics.add.staticGroup();
    //platform=this.physics.add.staticGroup();
    //platforms.create(400,568,'platform.jfif').setScale(2).refreshBody();
    
  }

  update(time, delta) {    
  }
}