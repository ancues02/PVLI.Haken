export default class PickMe extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite){
        super(scene, x, y, sprite);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this,true);
        this.activePower=false;
        //this.child = null;  //siempre tienes que tener algo que herede de ti, al ser una clase abstracta
    }
    //Esto es mas comodo creo hacerlo con componentes, o de otra forma xd
    preUpdate(){
        if (this.scene.physics.overlap(this.scene.player, this)){
           // this.scene.player.addPoint(2);
            this.activePower=true;
            //this.child.doYourThing();
            
        }
    }
}