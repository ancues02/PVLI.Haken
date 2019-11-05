import Personaje from './Personaje.js';  //esto esta aqui porque funciona
export default class Prota extends Personaje {
    constructor(scene, x,y, speed, dir, points, jumpImpulse, sprite){
        super(scene,x,y, speed, dir, points, sprite);
        //this.scene.add.existing(this);
        this.startPos={x: x, y: y};
        //this.lives=1;//es por si muere poder resetear su posicion
        //this.dimension= true; //true -> lado izquierdo; 
        this.jumpImpulse = jumpImpulse;

        //teclas para manejo de eventos
        this.a=scene.input.keyboard.addKey("A");
        this.d=scene.input.keyboard.addKey("D");
        this.space=scene.input.keyboard.addKey("SPACE");
        this.k=scene.input.keyboard.addKey("K");
    }

    addPoint(){
        this.points++;
        //this.updateScore();
        console.log(this.points);
    }
    getScore(){
        return this.score;
    }
    getX(){
        return this.pos.x;
    }
    getY(){
        return this.pos.y;
    }
    start(){
        this.y= this.startPos.y;
        this.x=this.startPos.x;
        this.dimension=true;
        this.lives=1;
    }

    preUpdate(){
    if(this.pos.y >= 780){//esto es por si se cae, luego no será necesario
        this.lives = 0;
    }
    if(this.lives<=0){
        this.start()
    }
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
        super.horizontalMove(-1);
    }else if(this.d.isDown){
        //if(this.x< 700)
        super.horizontalMove(1);     
    }
     
      if(this.space.isDown && this.body.onFloor()){
         this.body.setVelocityY(this.jump);
     }
     if(Phaser.Input.Keyboard.JustDown(this.k)){
         
        console.log(this.x);
        //this.dimension = !this.dimension;
        super.reverseDirection();
        if(this.pos.x<=700 && this.pos.x>=0){
        this.pos.x += 700;

        }
        else{
        this.pos.x -=700;
        }
        

        console.log(this.x);
     }


 }

    

}
