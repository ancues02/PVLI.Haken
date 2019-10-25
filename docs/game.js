import Player from './Player.js';
import Plataformas from './Plataformas.js';
export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() { 
     this.load.image('personaje','favicon.png')
     this.load.image('plataforma','platform.jfif')
     this.load.image('plataforma2','platformGirada.jfif')

     var platforms =this.physics.add.staticGroup();;

  }

  create() {
    //this.add.image(400, 300, 'plataforma');
    let Personaje = new Player (this, 500, 200, "personaje");
    //this.add.existing(Personaje);
    //platforms=this.physics.add.staticGroup();
    let platforms;
    platforms =this.physics.add.staticGroup();
    //platforms.create(400,568,'plataforma').setScale(2).refreshBody();
    platforms.create(600, 400, 'plataforma');
    platforms.create(1200, 400, 'plataforma');
    platforms.create(700, 400, 'plataforma2');

    this.physics.add.collider(Personaje,platforms);
    //let Plataforma=new Plataformas (this, 700,600,"plataforma");
    //platforms = this.physics.add.staticGroup();
    //platform=this.physics.add.staticGroup();
    //platforms.create(400,568,'platform.jfif').setScale(2).refreshBody();
    
  }

  update(time, delta) {    
  }
}