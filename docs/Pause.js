
export default class Pause extends Phaser.Scene {
    constructor() {
        super('Pause');
        //this.depth(1);

      }

      create(){
        this.escape=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);//boton pausa
        
        let resumeButton = this.add.text(600, 300, 'Resume!', {font:'100px', fill: '#fff'});
        resumeButton.setInteractive();
        resumeButton.on('pointerdown', ()=> { this.scene.stop('Pause'),this.scene.resume('Game')});
        
        
        let menuButton = this.add.text(600, 400, 'Menu!', {font:'100px', fill: '#fff'});
        menuButton.setInteractive();
        menuButton.on('pointerdown', ()=> { this.scene.stop('Pause'),this.scene.stop('Game')
        ,this.scene.start('Menu')});

        //this.add.text(10, 400, 'Última puntuación: '+this.player.getY(), {font:'100px', fill: '#000'});
      }
      //si se pulsa otra vez escape podemos volver a jugar
      update(){
        if(this.escape.isDown){
          this.scene.stop('Pause'),this.scene.resume('Game')    
        }
      }
      /*UpdateScore(point){
        console.log(point);
      }*/
    
      
}