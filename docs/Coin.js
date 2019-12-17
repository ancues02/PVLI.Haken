import PickMe from './PickMe.js';
export default class Coin extends PickMe{
    constructor(scene,x, y,points, sprite, sound){
        super(scene, x, y, sprite, sound);
        this.points=points;
        this.scene.anims.create({
            key: 'movCoin',
            frames: this.scene.anims.generateFrameNumbers(sprite, { start: 0, end: 5 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.play('movCoin');
    }
   
    preUpdate(time,delta){
        super.preUpdate(time,delta);
        if(this.activePower){
            this.scene.player.addPoint(this.points);
           // this.scene.coinSound.play();
            this.destroy();
        }
        
    }
    
}
