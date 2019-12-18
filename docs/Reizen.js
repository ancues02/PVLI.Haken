import Enemy from './Enemy.js';  
export default class Reizen extends Enemy{
    //enemigo volador, es el unico que no desciende de enemigo porque no queremos
    //que colisione con los muros. 
    constructor(scene, x,y, speed, dir, points, damage, lives,group , sprite){
        super(scene,x,y, speed, dir, points,damage,lives,group ,sprite);
        this.followPlayer=false;
        this.distance=200;
        //this.vel=speed;//necesario porque cuando sigue al jugador vamos a disminuir su velocidad
        this.changeDirectionX(-1);
        this.body.setAllowGravity(false);//como vuelas no tienes gravedad
        this.scene.anims.create({ //esto no va en game, para no tenerlo cada vez que creamos uno
            key: 'reizenAnim',
            frames: this.scene.anims.generateFrameNumbers(sprite, { start: 9, end: 10}),
            frameRate: 3,
            repeat: -1
        });
        this.yoMismo.anims.play('reizenAnim');
        }

    preUpdate(){
        //cuando no sigue al personaje se mueve en horizontal
        //como no tiene colisiones hay que cambiar su direccion para que no se pase de los limites
        if(!this.followPlayer ){
            this.horizontalMove();
            if(this.x<=this.scene.limits.left)this.changeDirectionX(1);
            else if(this.x>=this.scene.limits.right) this.changeDirectionX(-1);
            if(Phaser.Math.Distance.Between(this.x,this.y,this.scene.player.getX(),this.scene.player.getY())<this.distance) {
                this.followPlayer=true;
                //this.speed=this.vel/1.5;
            }
            
        }
        //aqui está a una distancia pequeña(this.distance) del jugador y le sigue,
        // si se aleja demasiado deja de seguirle
        else{
            if(Phaser.Math.Distance.Between(this.x,this.y,this.scene.player.getX(),this.scene.player.getY())>this.distance) {
                //this.speed=this.vel;

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
    /*hurt(){
        this.lives--;
        if(this.lives<=0){
        this.scene.player.addPoint(this.points);
        this.destroy();
        }
    }
    //si el getFlipped = true signigica que el jugador mira a la izquierda
    colisionPlayer(){
        if ( this.scene.physics.overlap(this.scene.player, this)){

            if(!this.scene.player.isDashing() ){
                if( this.scene.player.isAttacking()){
                    if(this.getX()<this.scene.player.getX() ){
                        if( this.scene.player.getFlipped())    this.hurt();
                        else{
                            this.scene.player.decreaseHealth(this.damage);
                        } 
                        
                    }
                    else{
                        if( !this.scene.player.getFlipped())    this.hurt();
                        else{
                            this.scene.player.decreaseHealth(this.damage);
                        }                         
                    }
                }
                else{
                    this.scene.player.decreaseHealth(this.damage);
                } 
            }
            else{
                this.hurt();
            }
            
       }
    }*/
}