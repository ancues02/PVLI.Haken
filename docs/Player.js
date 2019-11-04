export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x,y, sprite){
        super(scene, x, y, sprite);
        

        
       // this.scene.physics.world.enable(this);
        
        //this.scene.physics.setGravityY(0);
        //this.setBounce(0.2);
        scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
        //this.scene.physics.add.sprite(x,y,sprite);
        //this.scene.setBounce(0.2);
        //this.scene.physics.add.setCollideWorldBounds(true);

        //this.input.keyboard.on;
        this.dimension= true; //true -> lado izquierdo; 
        this.jump = -350;
        this.speed = 500;
        this.score = 0;
        this.a=scene.input.keyboard.addKey("A");
        this.d=scene.input.keyboard.addKey("D");
        this.space=scene.input.keyboard.addKey("SPACE");
        this.k=scene.input.keyboard.addKey("K");
        
        //this.updateScore();

       // this.setGravityY(0);
        //this.setImmovable();

        //this.keySpace=this.input.keyboard.addkey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //console.log(keySpace);
    }

    addPoint(){
        this.score++;
        //this.updateScore();
        console.log(this.score);
    }
    getScore(){
return this.score;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    
    preUpdate(){ 
       

       
        if(this.dimension){
            if( this.a.isDown){
                //if(this.x>0)
                
                this.body.setVelocityX(-this.speed);
                
            }else if(this.d.isDown){
                //if(this.x< 700)
                this.body.setVelocityX(this.speed);

               
            }
            else this.body.setVelocityX(0);
        }
        else{
            if( this.a.isDown){
                this.body.setVelocityX(this.speed);
                
            }else if(this.d.isDown){
                this.body.setVelocityX(-this.speed);

            }
            else this.body.setVelocityX(0);

        }
        
         if(this.space.isDown && this.body.onFloor()){
            this.body.setVelocityY(this.jump);
        }
        if(Phaser.Input.Keyboard.JustDown(this.k)){
            
            console.log(this.x);
            this.dimension = !this.dimension;
            if(this.x<=700 && this.x>=0){
                this.x += 700;

            }
            else{
                this.x -=700;
            }
            

            console.log(this.x);
        }


    }

    
}