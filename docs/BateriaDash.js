import PickMe from './PickMe.js';
//Resetea el dash
export default class BateríaDash extends PickMe{
    constructor(scene,x, y, sprite, sound){
        super(scene, x, y, sprite, sound);
    }
  

    preUpdate(){
        super.preUpdate();
        if(this.activePower){
            this.scene.player.resetDash();
            this.destroy();
        }
        
    }
}