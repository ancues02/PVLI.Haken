import Personaje from './Personaje.js';
//padre de todos los enemigos menos los pinchos
export default class Enemy extends Personaje  {
    constructor(scene, x,y, speed, dir, points, damage, lives, group, sprite){
        super(scene,x,y, speed, dir, points, lives, sprite);
        this.damage = damage;
        group.add(this);
    }
    //te reduce la vida
    decreaseHealth(){
        this.lives--;
        if(this.lives<=0){
        this.scene.player.addPoint(this.points);
        this.scene.enemyDeathSound.play()
        this.dies();
        }
    }
    //detecta las colisiones(overlap) con el prota, si se cumplen unas condiciones le quitamos vida
    //si no se cumplen nos la quita a nosotros
    //si el getFlipped = true signigica que el jugador mira a la izquierda
    colisionPlayer(){
        if ( this.scene.physics.overlap(this.scene.player, this)){
            if(!this.scene.player.isDashing() ){
                if( this.scene.player.isAttacking()){
                    if(this.getX()<this.scene.player.getX() ){
                        if( this.scene.player.getFlipped())    this.decreaseHealth();
                        else{
                            this.scene.player.decreaseHealth(this.damage);
                        }                 
                    }
                    else{
                        if( !this.scene.player.getFlipped())    this.decreaseHealth();
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
                this.decreaseHealth();
            }        
        }
    }
}
