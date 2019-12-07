import Enemy from './Enemy.js';  //esto esta aqui porque funciona
export default class Zoppo extends Enemy  {
    constructor(scene, x,y, speed, dir, points, damage, lives, group, sprite){
        super(scene,x,y, speed, dir, points, damage,lives, group, sprite);
        this.noFloorMove=10;//para que cambie de direccion cuando no hay suelo
    }

    preUpdate(){
        this.horizontalMove();//lo movemos
        //para cambiar de direccion si no hay suelo o encuentra un muro
        if(this.body.onFloor()===false || this.body.onWall()===true) {
            if(this.direction.x===1){
                this.x-=this.noFloorMove;
                this.changeDirectionX(-1);
            }
            else{
                this.x+=this.noFloorMove;
                this.changeDirectionX(1);
            }
        }
        super.colisionPlayer();   
    }
}