import PickMe from './PickMe.js';
export default class Spring extends PickMe{
    constructor(scene,x, y, sprite, sound){
        super(scene, x, y, sprite, sound);
    }
    preUpdate(){
        super.preUpdate();
        if(this.activePower){
            this.scene.player.changeJumpImpulse();
            this.destroy();
        }
        
    }
}