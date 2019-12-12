import Enemy from './Enemy.js';  
import Personaje from './Personaje.js';  
export default class Reizen extends Personaje/*extends Enemy*/  {
    //enemigo volador
    //scene, x,y, speed, dir, points, lives,sprite
    constructor(scene, x,y, speed, dir, points, damage, lives,  sprite){
        super(scene,x,y, speed, dir, points,/* damage,*/lives, sprite);
        this.startMove=false;
//hay que dejar de ser un objeto fisico para poder atravesar paredes, por eso heredo de personaje y no de enemy
        
        //this.yoMismo=sprite;
        this.changeDirectionX(-1);
        this.body.setAllowGravity(false);//como vuelas no tienes gravedad
        }

    preUpdate(){
        //this.verticalMove()
        //this.horizontalMove();
        // if( this.body.onWall()===true) {
        //     if(this.direction.x===1){
        //         this.x-=30;
        //         this.changeDirectionX(-1);
        //         //this.yoMismo.setFlipX(true);

        //     }
        //     else{
        //         this.x+=30;

        //         this.changeDirectionX(1);
        //         //super.yoMismo.setFlipX(false);

        //     }
        // }
        //this.hurt();   
        this.colisionPlayer();

    }
    hurt(){
        this.lives--;
        if(this.lives<=0){
        this.scene.player.addPoint(this.points);
        this.destroy();
        }
    }
    //si el getFlipped = true signigica que el jugador mira a la izquierda
    colisionPlayer(){
       /* if ( this.scene.physics.overlap(this.scene.player, this)){
            if(!this.scene.player.isDashing() ){
                if( this.scene.player.isAttacking()){
                    if(this.getX()<this.scene.player.getX() ){
                        if( this.scene.player.getFlipped())    this.hurt();
                        else{
                            //this.changeDirectionX(-this.direction.x);
                            this.scene.player.decreaseHealth(this.damage);
                        } 
                        
                    }
                    else{
                        if( !this.scene.player.getFlipped())    this.hurt();
                        else{
                            //this.changeDirectionX(-this.direction.x);
                            this.scene.player.decreaseHealth(this.damage);
                        }                         
                    }
                }
                else{
                    //this.changeDirectionX(-this.direction.x);
                    this.scene.player.decreaseHealth(this.damage);
                } 
            }
            else*///{
                this.hurt();
            //}
            
       // }
    }
}