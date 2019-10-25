export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x,y, sprite){
        super(scene, x, y, sprite);

        
        //scene.physics.world.enable(this);
        scene.add.existing(this);
        //this.input.keyboard.on;
        this.d=scene.input.keyboard.addKey("A");
        this.a=scene.input.keyboard.addKey("D");
    }

    
    create(){
        console.log('cambio de posicion en Update')

        this.d=scene.input.keyboard.addKey("A");
        this.a=scene.input.keyboard.addKey("D");

    }
    preUpdate(){ 
        
        //console.log('cambio de posicion');
        //this.right=this.input.keyboard.addKey("keyup_RIGHT");
        //this.left=this.input.keyboard.addKey("LEFT");

       /* if(this.keyboard==="keydown_RIGHT"){
            console.log('cambio de posicion')
           // this.ChangePos(this.mouse.worldX - this.x, this.mouse.worldY-this.y, 0.03);
           this.x++;
        }*/
         if(this.a.isDown){
            this.x++;
        }else if(this.d.isDown){
            this.x--;
        }

    }

    
}