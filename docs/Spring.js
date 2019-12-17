import PickMe from './PickMe.js';
export default class Spring extends PickMe{
    constructor(scene,x, y, sprite){
        super(scene, x, y, sprite);
    }
    preUpdate(){
        super.preUpdate();
        if(this.activePower===true){
            this.scene.player.changeJumpImpulse();
            this.destroy();
        }
        
    }
}