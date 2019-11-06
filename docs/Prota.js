import Personaje from './Personaje.js';  //esto esta aqui porque funciona
export default class Prota extends Personaje {
    constructor(scene, x,y, speed, dir, points, jumpImpulse, sprite){
        super(scene,x,y, speed, dir, points, sprite);
        //this.scene.add.existing(this);
        this.startPos={x: x, y: y};
        //this.lives=1;//es por si muere poder resetear su posicion
        //this.dimension= true; //true -> lado izquierdo; 
        this.jumpImpulse = jumpImpulse;
        this.dimValue = 1; //1 == lado izq, -1 == lado derecho
        //teclas para manejo de eventos
        this.a=scene.input.keyboard.addKey("A");
        this.d=scene.input.keyboard.addKey("D");
        this.space=scene.input.keyboard.addKey("SPACE");
        this.k=scene.input.keyboard.addKey("K");

        /*this.container=this.scene.add.container(10,0);
        this.sprite1= this.scene.add.sprite(x,y,sprite);
        this.container.add(this.sprite1);
        this.container.setSize(128, 64);
        this.scene.physics.add.existing(this.container);
        //this.physics.world.enable(this.container);
        this.container.body.collideWorldBounds=true;*/

    }

    addPoint(){
        this.points++;
        //this.updateScore();
        console.log(this.points);
    }
    start(){
        this.y= this.startPos.y;
        this.x=this.startPos.x;
        this.dimValue=1;
        this.lives=1;
    }
    changeDimValue(){
        this.dimValue *= -1;
    }
    preUpdate(){
    if(this.y >= 780){//esto es por si se cae, luego no será necesario
        this.lives = 0;
    }
    if(this.lives<=0){
        this.start()
    }
    //this.container.rotation += 0.02;
    //  if(this.dimension){
    //     if( this.a.isDown){
    //          //if(this.x>0)
             
    //          this.body.setVelocityX(-this.speed);
             
    //      }else if(this.d.isDown){
    //          //if(this.x< 700)
    //          this.body.setVelocityX(this.speed);

            
    //      }
    //      else this.body.setVelocityX(0);
    //  }
    //  else{
    //      if( this.a.isDown){
    //          this.body.setVelocityX(this.speed);
             
    //      }else if(this.d.isDown){
    //          this.body.setVelocityX(-this.speed);

    //      }
    //      else this.body.setVelocityX(0);

    //  }
    if( this.a.isDown){
        //if(this.x>0)
        //this.body.setVelocityX(-this.dimValue * this.speed)
        //super.horizontalMove(-1);
        super.changeDirection(-1 * this.dimValue, 0);
        super.horizontalMove2();
    }else if(this.d.isDown){
        //if(this.x< 700)
        //super.horizontalMove(1); 
        super.changeDirection(1 * this.dimValue, 0);
        super.horizontalMove2();    
    }
    else{
        //super.horizontalMove(0);
        super.stop();
    }
     
    //jump
    if(this.space.isDown && this.body.onFloor()){
        this.body.setVelocityY(this.jumpImpulse);
    }
    
    //Cambio de dimension
    if(Phaser.Input.Keyboard.JustDown(this.k)){
         
        console.log(this.x);
        //this.dimension = !this.dimension;
        this.changeDimValue();
        //super.reverseDirection();
        if(this.x<=700 && this.x>=0){
            this.x += 700;

        }
        else{
        this.x -=700;
        }
        

        //console.log(this.x);
    }


 }

    

}
