//menu principal del juego, tiene su fondo y la unica opcion de empezar a jugar
export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
      }
      preload(){
        this.load.image('fondo', './fondoMenu.png');
        this.load.audio('menuTheme','./menuTheme.ogg');

      }
      create(){
        this.menuTheme = this.sound.add('menuTheme', {
          mute: false,
          volume: 0.7,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delay: 0
        });
        this.menuTheme.play()
        this.add.sprite(750,300,'fondo')
        let playButton = this.add.text(550, 300, 'Start!', {font:'100px', fill: '#fff'});
        playButton.setInteractive();
        playButton.on('pointerdown', ()=> {this.menuTheme.stop(),this.scene.start('Game')})
      }
     
    
      
}