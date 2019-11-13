import Enemy from './Enemy.js';  //esto esta aqui porque funciona
export default class Zoppo extends Enemy  {
    constructor(scene, x,y, speed, dir, points, damage, lives,  sprite){
        super(scene,x,y, speed, dir, points, damage,lives, sprite);
        
    }

    preUpdate(){
        this.horizontalMove();

        if(this.body.onFloor()===false || this.body.onWall()===true) {
            if(this.direction.x===1){
                this.x-=10;
                this.changeDirectionX(-1);
            }
            else{
                this.x+=10;
                this.changeDirectionX(1);
            }
        }
        super.preUpdate();   
    }
}