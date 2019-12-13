
export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
        //this.clickCountText = scene.add.text(100, 200, '');
        //this.incrementButton = new Button(this.scene, 100, 100, 'Increment Count', { fill: '#0f0'}, () => this.incrementClickCount());
        //this.lastPoints=0;

      }
      preload(){
        this.load.image('fondo', './fondoMenu.png');

      }
      create(){
        this.add.sprite(750,300,'fondo')
        let playButton = this.add.text(550, 300, 'Start!', {font:'100px', fill: '#000'});
        playButton.setInteractive();
        playButton.on('pointerdown', ()=> {this.scene.start('Game')})
        //this.add.text(10, 400, 'Última puntuación: '+this.lastPoints, {font:'100px', fill: '#000'});
      }
      /*updateScore(points){
        this.lastPoints=points;
      }*/
    
      
}