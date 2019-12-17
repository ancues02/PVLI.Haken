import PickMe from './PickMe.js';
export default class changeMov extends PickMe{
    constructor(scene,x, y, sprite, sound){
        super(scene, x, y, sprite, sound);       
    }
   
    preUpdate(){
        super.preUpdate();
        if(this.activePower===true){
            this.scene.player.invertMov();
            this.destroy();
        }
        
    }
    
}