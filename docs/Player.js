export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x,y, sprite){
        super(scene, x, y, sprite);

        
        //.physics.world.enable(this);
        //this.scene.physics.setGravityY(0);
        scene.setBounce(0.2);
        scene.add.existing(this);
        //this.input.keyboard.on;
        this.a=scene.input.keyboard.addKey("A");
        this.d=scene.input.keyboard.addKey("D");
        this.w=scene.input.keyboard.addKey("SPACE");
       // this.setGravityY(0);
        //this.setImmovable();

        //this.keySpace=this.input.keyboard.addkey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //console.log(keySpace);
    }

    
    /*create(){
        console.log('cambio de posicion en Update')

        this.d=scene.input.keyboard.addKey("A");
        this.a=scene.input.keyboard.addKey("D");
       // this.SPACE=scene.input.keyboard.addKey("SPACE");
        this.keySpace=this.input.keyboard.addkey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }*/
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
            this.x--;
        }else if(this.d.isDown){
            this.x++;
        }
        else if(this.w.isDown){
            this.y=this.y-5;
        }
        

    }

    
}