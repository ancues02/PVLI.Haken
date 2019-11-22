
export default class Pause extends Phaser.Scene {
    constructor() {
        super('Pause');
        

      }

      create(){
        console.log("escena Game pausada? "+this.scene.isPaused('Game'));
        console.log("escena Game activa? "+this.scene.isActive('Game'));
        let pauseButton = this.add.text(300, 300, 'Pause!', {font:'100px', fill: '#fff'});
        pauseButton.setInteractive();
        pauseButton.on('pointerdown', ()=> { this.scene.stop('Pause'),this.scene.resume('Game')})
      }
    
      
}