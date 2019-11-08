export default class PickMe extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite){
        super(scene, x, y, sprite);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this,true);
    }

    preUpdate(){
        if (this.scene.physics.overlap(this.scene.player, this)){
            this.scene.player.addPoint(2);
            this.destroy();
        }
    }
}