export default class Contenedor extends Phaser.GameObjects.Container  {
    constructor(scene, x,y, sprite,espada,shield){
        super(scene,x,y);
        this.scene.add.existing(this);
        this.yoMismo= this.scene.add.sprite(x,y,sprite)
        this.add(this.yoMismo)
        //this.add(this.epada)
        //scene.add.existing(this);
        this.scene.physics.add.existing(this);

        
        /*this.container=this.scene.add.container(200,300);
        this.sprite1= this.scene.add.sprite(20,180,espada);
        //this.container.add(this.sprite1);*/
       
    }
    getY(){
        return this.y;
    }
    getPoints(){
        return this.points;
    }

}