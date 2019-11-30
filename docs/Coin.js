import PickMe from './PickMe.js';
export default class Coin extends PickMe{
    constructor(scene,x, y, sprite){
        super(scene, x, y, sprite);
        this.points=2;
    }
   
    preUpdate(){
        super.preUpdate();
        if(this.activePower===true){
            this.scene.player.addPoint(this.point);
            console.log("soy un Coin");
            this.destroy();
        }
        
    }
    
}