import PickMe from './PickMe.js';
export default class BateríaDash extends PickMe{
    constructor(scene,x, y, sprite){
        super(scene, x, y, sprite);
    }
  

    preUpdate(){
        super.preUpdate();
        if(this.activePower===true){
            this.scene.player.resetDash();
            console.log("soy un BateríaDash");
            this.destroy();
        }
        
    }
}