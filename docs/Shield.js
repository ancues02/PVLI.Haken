import PickMe from './PickMe.js';
//da un escudo al prota, que equivale a una vida extra
export default class Shield extends PickMe{
    constructor(scene,x, y, sprite, sound){
        super(scene, x, y, sprite, sound);
    }
    preUpdate(){
        super.preUpdate();
        if(this.activePower){
            this.scene.player.shielded();
            this.destroy();
        }
        
    }
}