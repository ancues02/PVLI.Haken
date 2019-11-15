import PickMe from './PickMe.js';
export default class Spring extends PickMe{
    constructor(scene,x, y, sprite){
        super(scene, x, y, sprite);
        this.child = this;  //le dice a PickMe que es su hijo
    }
    doYourThing(){
        this.scene.player.changeJumpImpulse();
        console.log("soy un Spring");
    }
}