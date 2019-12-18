import Enemy from './Enemy.js';  
export default class Reizen extends Enemy{
    //enemigo volador, es el unico que no desciende de enemigo porque no queremos
    //que colisione con los muros. 
    constructor(scene, x,y, speed, dir, points, damage, lives,group , sprite,anim){
        super(scene,x,y, speed, dir, points,damage,lives,group ,sprite);
        this.followPlayer=false;
        this.distance=200;
        this.changeDirectionX(-1);
        this.body.setAllowGravity(false);//como vuelas no tienes gravedad
        
        this.yoMismo.anims.play(anim);        }

    preUpdate(){
        //cuando no sigue al personaje se mueve en horizontal
        //como no tiene colisiones hay que cambiar su direccion para que no se pase de los limites
        if(!this.followPlayer ){
            this.horizontalMove();
            if(this.x<=this.scene.limits.left)this.changeDirectionX(1);
            else if(this.x>=this.scene.limits.right) this.changeDirectionX(-1);
            if(Phaser.Math.Distance.Between(this.x,this.y,this.scene.player.getX(),this.scene.player.getY())<this.distance) {
                this.followPlayer=true;
            }
            
        }
        //aqui esta a una distancia pequeña(this.distance) del jugador y le sigue,
        // si se aleja demasiado deja de seguirle
        else{
            //aqui deja de seguirle
            if(Phaser.Math.Distance.Between(this.x,this.y,this.scene.player.getX(),this.scene.player.getY())>this.distance) {
                this.followPlayer=false;
                if(this.scene.player.getDimValue()===1) {
                    this.changeDirectionX(-1);
                }
                else{
                    this.changeDirectionX(1);
                }
                this.horizontalMove();
                //con esto hacemos que no se mueva en el eje Y
                this.changeDirectionY(0);
                this.verticalMove();

            }
            //aqui le sigue
            else{
                this.horizontalMove();
                this.verticalMove();
                if(this.x<=this.scene.player.getX()-5){
                    this.changeDirectionX(1);
                }
                else if(this.x>=this.scene.player.getX()+5) this.changeDirectionX(-1);

                else this.changeDirectionX(0);//para que no rote si esta en la misma X con un rango 10

                if(this.y<=this.scene.player.getY()-5){
                    this.changeDirectionY(1);
                }
                else if(this.y>=this.scene.player.getY()+5) this.changeDirectionY(-1);
                else{//para que no rote si esta en la misma Y con un rango 10
                    this.changeDirectionY(0);
                } 
            }
        }        
        this.colisionPlayer();
    }
}