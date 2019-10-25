import Player from './Player.js';
export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() { 
     this.load.image('personaje','descarga.jpg')
  }

  create() {
    //this.add.image(400, 300, 'personaje');
    let Personaje = new Player (this, 700, 500, "personaje");
    this.add.existing(Personaje);
    
    
  }

  update(time, delta) {    
  }
}