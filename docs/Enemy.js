import Personaje from './Personaje.js';  //esto esta aqui porque funciona
export default class Enemy extends Personaje  {
    constructor(scene, x,y, speed, dir, points, damage, lives,  sprite){
        super(scene,x,y, speed, dir, points, lives, sprite);
        this.damage = damage;

        //this.scene.add.existing(this);
        //this.scene.physics.add.existing(this,true);
    }

    colisionPlayer(){
        if ( this.scene.physics.overlap(this.scene.player, this)){
            if(!this.scene.player.isDashing() && !this.scene.player.isAttacking()){
                this.scene.player.decreaseHealth();
            }
            else{
                this.lives--;
                if(this.lives<=0){
                this.scene.player.addPoint(this.points);
                this.destroy();
                }
            }
            
        }
    }

}
