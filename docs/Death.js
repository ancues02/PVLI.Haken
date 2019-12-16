
export default class Death extends Phaser.Scene {
    constructor() {
        super('Death');
        //this.depth(1);

    }

    create(){
        this.escape=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);//boton pausa
        
        let resumeButton = this.add.text(400, 300, 'Play again!', {font:'100px', fill: '#fff'});
        resumeButton.setInteractive();
        resumeButton.on('pointerdown', ()=> { this.scene.stop(),this.scene.start('Game')});
        
        
        let menuButton = this.add.text(400, 430, 'Menu!', {font:'100px', fill: '#fff'});
        menuButton.setInteractive();
        menuButton.on('pointerdown', ()=> { this.scene.stop('Death'),this.scene.stop('Game')
        ,this.scene.start('Menu')});
    }
      
    
      
}