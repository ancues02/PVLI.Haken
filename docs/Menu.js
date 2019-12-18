//menu principal del juego, tiene su fondo y la unica opcion de empezar a jugar
export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
      }
      preload(){
        this.load.image('fondo', './fondoMenu.png');
      }
      create(){
        this.add.sprite(750,300,'fondo')
        let playButton = this.add.text(550, 300, 'Start!', {font:'100px', fill: '#fff'});
        playButton.setInteractive();
        playButton.on('pointerdown', ()=> {this.scene.start('Game')})
      }
     
    
      
}