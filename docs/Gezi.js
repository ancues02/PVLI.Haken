import Enemy from './Enemy.js'; 
export default class Gezi extends Enemy  {
    constructor(scene, x,y, speed, dir, points, damage, lives,  sprite){
        super(scene,x,y, speed, dir, points, damage,lives, sprite);
        this.startMove=false;
        //this.yoMismo=sprite;
        this.body.setGravityY(0);//aunque pongas la velocity en 0, sigue afectando la gravedad parece
      }

    preUpdate(){

        if(this.startMove) this.horizontalMove();
        if(this.startMove===false && this.y-this.scene.player.y<=50){
            this.startMove=true;
            if(this.x<=this.scene.player.x)this.direction.x=1;
            else this.direction.x=-1;
        } 
        //else {this.startMove=false;}
        if(this.startMove && (this.body.onFloor()===false || this.body.onWall()===true)) {
            if(this.direction.x===1){
                this.x-=30;
                this.changeDirectionX(-1);
               // this.yoMismo.setFlipX(false);

            }
            else{
                this.x+=30;
                this.changeDirectionX(1);
                //this.yoMismo.setFlipX(true);

            }
        }
        super.colisionPlayer();   

    }
}