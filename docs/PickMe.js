export default class PickMe extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite, sound){
        super(scene, x, y, sprite);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this,true);
        this.activePower=false;
        this.sound = sound;
    }

    preUpdate(time,delta){
        //super.preUpdate(time,delta);
        if (this.scene.physics.overlap(this.scene.player, this)){
            this.sound.play();
            this.activePower=true;       
        }
    }
}