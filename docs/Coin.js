import PickMe from './PickMe.js';
export default class Coin extends PickMe{
    constructor(scene,x, y, sprite){
        super(scene, x, y, sprite);
        this.points=2;
        this.scene.anims.create({
            key: 'movCoin',
            frames: this.scene.anims.generateFrameNumbers(sprite, { start: 0, end: 5 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.play('movCoin');
    }
   
    preUpdate(time,delta){
        super.preUpdate(time,delta);
        if(this.activePower===true){
            this.scene.player.addPoint(this.points);
            console.log("soy un Coin");
            this.destroy();
        }
        
    }
    
}
