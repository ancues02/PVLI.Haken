
export default class Spike extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite){
        super(scene, x, y, sprite);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this,true);
        this.damage=1;
        
    }
    preUpdate(){

        if(this.scene.physics.overlap(this.scene.player, this)){
            this.scene.player.decreaseHealth(this.damage);                        
        }    
    }

    
}