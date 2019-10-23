export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() { 
     this.load.image('personaje','descarga.jpg')
  }

  create() {
    this.add.image(400, 300, 'personaje');
    
  }

  update(time, delta) {    
  }
}