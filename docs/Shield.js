import PickMe from './PickMe.js';
export default class Shield extends PickMe{
    constructor(scene,x, y, sprite){
        super(scene, x, y, sprite);
        this.scene=scene;
    }
    preUpdate(){
        super.preUpdate();
        if(this.activePower===true){
            console.log("soy un Shield");

            this.scene.player.shielded();
            this.destroy();
        }
        
    }
}