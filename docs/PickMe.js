export default class PickMe extends Phaser.GameObjects.Sprite{
    //si colisiona(overlap) activa el poder que haran sus hijos
    constructor(scene, x, y, sprite, sound){
        super(scene, x, y, sprite);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this,true);
        this.activePower=false;
        this.sound = sound;
    }

    preUpdate(time,delta){
        if (this.scene.physics.overlap(this.scene.player, this)){
            this.sound.play();
            this.activePower=true;       
        }
    }
}