//menu final, se activa cuando mueres o ganas, puedes volver a jugar o ir al menu principal
export default class EndMenu extends Phaser.Scene {
    constructor() {
        super('EndMenu');
    }
    preload(){
        this.load.audio('endTheme','./endMenu.wav');
      }
    create(){    
        this.menuTheme = this.sound.add('endTheme', {
            mute: false,
            volume: 0.7,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
          });
          this.menuTheme.play()    
        let resumeButton = this.add.text(400, 300, 'Play again!', {font:'100px', fill: '#fff'});
        resumeButton.setInteractive();
        resumeButton.on('pointerdown', ()=> { this.menuTheme.stop(),this.scene.stop(),this.scene.start('Game')});
                
        let menuButton = this.add.text(400, 430, 'Menu!', {font:'100px', fill: '#fff'});
        menuButton.setInteractive();
        menuButton.on('pointerdown', ()=> { this.menuTheme.stop(),this.scene.stop(),this.scene.stop('Game')
        ,this.scene.start('Menu')});
    }
      
    
      
}