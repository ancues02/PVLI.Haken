
export default class Pause extends Phaser.Scene {
    constructor() {
        super('Pause');
        

      }

      create(){
        this.escape=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);//boton pausa
        
        let pauseButton = this.add.text(300, 300, 'Pause!', {font:'100px', fill: '#fff'});
        pauseButton.setInteractive();
        pauseButton.on('pointerdown', ()=> { this.scene.stop('Pause'),this.scene.resume('Game')})
      }
      //si se pulsa otra vez escape podemos volver a jugar
      update(){
        if(this.escape.isDown){
          this.scene.stop('Pause'),this.scene.resume('Game')    
        }
      }
    
      
}