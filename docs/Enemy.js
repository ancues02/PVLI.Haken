import Personaje from './Personaje.js';  //esto esta aqui porque funciona
export default class Enemy extends Personaje  {
    constructor(scene, x,y, speed, dir, points, damage, lives,  sprite){
        super(scene,x,y, speed, dir, points, lives, sprite);
        this.damage = damage;   //no estamos usando
        //super.setSize(this.width,this.height); //ajusta
        //this.scene.add.existing(this);
        //this.scene.physics.add.existing(this,true);
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
        if ( this.scene.physics.overlap(this.scene.player, this)){
            if(!this.scene.player.isDashing() ){
                if( this.scene.player.isAttacking()){
                    if(this.getX()<this.scene.player.getX() ){
                        if( this.scene.player.getFlipped())    this.hurt();
                        else this.scene.player.decreaseHealth();
                        
                    }
                    else{
                        if( !this.scene.player.getFlipped())    this.hurt();
                        else this.scene.player.decreaseHealth();
                        
                    }
                }
                else this.scene.player.decreaseHealth();
            }
            else{
                this.hurt();
            }
            
        }
    }

}
