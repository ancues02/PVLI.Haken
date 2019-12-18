import Enemy from './Enemy.js'; 
//se mueve hasta encontrar un obstaculo o hueco, entonces cambia de direccion 
export default class Zoppo extends Enemy  {
    constructor(scene, x,y, speed, dir, points, damage, lives, group, sprite){
        super(scene,x,y, speed, dir, points, damage,lives, group, sprite);
        this.noFloorMove=15;//se usa para cambiar de direccion y que no caiga
        this.scene.anims.create({
            key: 'zoppoAnim',
            frames: this.scene.anims.generateFrameNumbers(sprite, { start: 0, end: 2 }),
            frameRate: 2,
            repeat: -1
        });
        this.yoMismo.anims.play('zoppoAnim');
    }

    preUpdate(){
        this.horizontalMove();//lo movemos
        //para cambiar de direccion si no hay suelo o encuentra un muro
        if(!this.body.onFloor() || !this.body.onWall()) {
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