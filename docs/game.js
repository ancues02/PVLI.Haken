export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() { 
     this.load.image('prueba','descarga.jpg')
  }

  create() {
  }

  update(time, delta) {    
  }
}