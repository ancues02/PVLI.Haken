import PickMe from './PickMe.js';
export default class Shield extends PickMe{
    constructor(scene,x, y, sprite, sound){
        super(scene, x, y, sprite, sound);
    }
    preUpdate(){
        super.preUpdate();
        if(this.activePower===true){
            this.scene.player.shielded();
            this.destroy();
        }
        
    }
}