import PickMe from './PickMe.js';
export default class changeMov extends PickMe{
    constructor(scene,x, y, sprite){
        super(scene, x, y, sprite);
        
    }
   
    preUpdate(){
        super.preUpdate();
        if(this.activePower===true){
            this.scene.player.invertMov();
            console.log("soy un ChangeMov");
            this.destroy();
        }
        
    }
    
}