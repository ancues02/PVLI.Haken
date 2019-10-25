export default class Personaje extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y){
        super(scene,x,y,'favicon');
        this.scene.add.existing(this);
    }
    point(){

    }

}
