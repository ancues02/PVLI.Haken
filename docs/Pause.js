//Menu de Pausa, tiene las opciones de ir al menu y de seguir jugando
//ademas si se pulsa escape se reanuda partidas
export default class Pause extends Phaser.Scene {
    constructor(scene) {
        super('Pause');
        
      }
      preload(){
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
        this.escape=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);//boton pausa
        
        let resumeButton = this.add.text(600, 150, 'Resume!', {font:'100px', fill: '#fff'});
        resumeButton.setInteractive();
        resumeButton.on('pointerdown', ()=> { this.menuTheme.stop(), this.scene.stop('Pause'),this.scene.resume('Game')});
        
        
        let menuButton = this.add.text(600, 280, 'Menu!', {font:'100px', fill: '#fff'});
        menuButton.setInteractive();
        menuButton.on('pointerdown', ()=> { this.menuTheme.stop(), this.scene.stop('Pause'),this.scene.stop('Game')
        ,this.scene.start('Menu')});

      }
      //si se pulsa otra vez escape podemos volver a jugar
      update(){
        if(this.escape.isDown){
          this.menuTheme.stop();
          this.scene.stop('Pause');
          this.scene.resume('Game');
          
        }
      }
    
      
      
}