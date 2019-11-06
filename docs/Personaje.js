export default class Personaje extends Phaser.GameObjects.Sprite{
    constructor(scene, x,y, speed, dir, points, sprite){
        super(scene, x, y, sprite);   
        scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.collideWorldBounds=true;
        //this.scene.physics.add.sprite(x,y,sprite);
        //this.scene.setBounce(0.2);
        //this.scene.physics.add.setCollideWorldBounds(true);
        //this.sprite0= this.physics.add.sprite(-100,0,sprite);

        //this.input.keyboard.on; 
        
        //this.dimension= true; //true -> lado izquierdo; 
        //this.dimValue = 1;
        //this.startPos={x,y};
        this.lives = 1;//es por si muere poder resetear su posicion / vida
        //this.pos = {x: x, y: y};
        this.direction = dir;
        this.speed = speed;
        this.points = points;
        // this.jump = -350;
        // this.dashMult= 2;
        // this.score = 0;
        // this.a=scene.input.keyboard.addKey("A");
        // this.d=scene.input.keyboard.addKey("D");
        // this.space=scene.input.keyboard.addKey("SPACE");
        // this.k=scene.input.keyboard.addKey("K");
        // this.j=scene.input.keyboard.addKey("J");
        
        //this.updateScore();

       // this.setGravityY(0);
        //this.setImmovable();

        //this.keySpace=this.input.keyboard.addkey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //console.log(keySpace);
    }
    
    changeDirection(nx, ny){
        this.direction = {x: nx, y:ny};
        // this.direction.x = nx;
        // this.direction.y = ny;
    }
    stop(){
        this.body.setVelocityX(0);
    }
    horizontalMove2(){
        this.body.setVelocityX(this.direction.x * this.speed);
    }
    //no lo uso
    // horizontalMove(inv){
    //     this.body.setVelocityX(inv * this.direction.x * this.speed);
    // }
    dies(){
        this.destroy();
    }

    //getters
    getPoints(){
        return this.points;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    // start(){
    //     this.y= this.startPos.y;
    //         this.x=this.startPos.x;
    //         this.dimension=true;
    //         this.alive=true;
    // }
    // preUpdate(){ 
       
    //     if(this.y>=780){//esto es por si se cae, luego no será necesario
    //            this.alive=false;
    //     }
    //    if(!this.alive){
    //         this.start()
    //    }
    //     // if(this.dimension){
    //     //     if( this.a.isDown){
    //     //         //if(this.x>0)
    //     //         this.body.setVelocityX(-this.speed);
                
    //     //     }else if(this.d.isDown){
    //     //         //if(this.x< 700)
    //     //         this.body.setVelocityX(this.speed);

               
    //     //     }
    //     //     else this.body.setVelocityX(0);
    //     // }
    //     // else{
    //     //     if( this.a.isDown){
    //     //         this.body.setVelocityX(this.speed);
                
    //     //     }else if(this.d.isDown){
    //     //         this.body.setVelocityX(-this.speed);

    //     //     }
    //     //     else this.body.setVelocityX(0);

    //     // }
    //     if( this.a.isDown){
    //         //if(this.x>0)
    //         this.body.setVelocityX(-this.dimValue * this.speed);
            
    //     }else if(this.d.isDown){
    //         //if(this.x< 700)
    //         this.body.setVelocityX(this.dimValue * this.speed);

           
    //     }
    //     else this.body.setVelocityX(0);
    //     if(this.space.isDown && this.body.onFloor()){
    //         this.body.setVelocityY(this.jump);
    //     }
    //     if(Phaser.Input.Keyboard.JustDown(this.k)){
            
    //         console.log(this.x);
    //         //this.dimension = !this.dimension;
    //         this.dimValue *= -1;
    //         if(this.x<=700 && this.x>=0){
    //             this.x += 700;

    //         }
    //         else{
    //             this.x -=700;
    //         }
            

    //         console.log(this.x);
    //     }


    // }

    
}