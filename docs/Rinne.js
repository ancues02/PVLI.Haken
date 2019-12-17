import Zoppo from './Zoppo.js';
//comportamiento igual que zoppo pero empieza a moverse cuando el jugador esta a su "misma" altura
export default class Rinne extends Zoppo  {
    constructor(scene, x,y, speed, dir, points, damage, lives, group, sprite){
        super(scene,x,y, speed, dir, points, damage,lives,group, sprite);
        this.startMove=false;
        this.distance=100;
    }

    preUpdate(){
        if(this.startMove){
            this.noFloorMove=30;//para desplazarlo un poco y que nocaiga
            super.preUpdate();
            
        } 
        //para que empiece a moverse hacia donde está el jugador
        else if(!this.startMove && this.y-this.scene.player.y<=this.distance){
            if(this.x<this.scene.dimMargin && this.scene.player.getDimValue()===1 ||this.x>this.scene.dimMargin && this.scene.player.getDimValue()===-1 ){
                console.log(this.scene.player.getDimValue());
                this.startMove=true;
                if(this.x<=this.scene.player.x)this.direction.x=1;
                else this.direction.x=-1;
            }
            
        } 

       
    }
}