import PickMe from './PickMe.js';
export default class Coin extends PickMe{
    constructor(scene,x, y, sprite){
        super(scene, x, y, sprite);
        this.child = this;  //le dice a PickMe que es su hijo
    }
    doYourThing(){
        this.scene.player.addPoint(2);
        console.log("soy una Coin");
    }
}