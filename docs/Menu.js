
export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
        //this.clickCountText = scene.add.text(100, 200, '');
        //this.incrementButton = new Button(this.scene, 100, 100, 'Increment Count', { fill: '#0f0'}, () => this.incrementClickCount());
        console.log("Escena")

      }

      create(){
        let playButton = this.add.text(300, 300, 'Start!', {font:'100px', fill: '#fff'});
        playButton.setInteractive();
        playButton.on('pointerdown', ()=> {this.scene.start('Game')})
      }
    
      
}