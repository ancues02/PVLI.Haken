//menu final, se activa cuando mueres o ganas, puedes volver a jugar o ir al menu principal
export default class Death extends Phaser.Scene {
    constructor() {
        super('Death');
    }

    create(){        
        let resumeButton = this.add.text(400, 300, 'Play again!', {font:'100px', fill: '#fff'});
        resumeButton.setInteractive();
        resumeButton.on('pointerdown', ()=> { this.scene.stop(),this.scene.start('Game')});
                
        let menuButton = this.add.text(400, 430, 'Menu!', {font:'100px', fill: '#fff'});
        menuButton.setInteractive();
        menuButton.on('pointerdown', ()=> { this.scene.stop('Death'),this.scene.stop('Game')
        ,this.scene.start('Menu')});
    }
      
    
      
}