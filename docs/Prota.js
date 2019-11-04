export default class Prota extends Personaje {
    constructor(scene, x, y){
        super(scene,x,y,'favicon');
        //this.scene.add.existing(this);
        this.startPos={x,y};
        this.lives=1;//es por si muere poder resetear su posicion
        this.dimension= true; //true -> lado izquierdo; 
        this.jump = -350;
        this.speed = 500;
        this.score = 0;
        this.a=scene.input.keyboard.addKey("A");
        this.d=scene.input.keyboard.addKey("D");
        this.space=scene.input.keyboard.addKey("SPACE");
        this.k=scene.input.keyboard.addKey("K");
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
    start(){
        this.y= this.startPos.y;
            this.x=this.startPos.x;
            this.dimension=true;
            this.lives=1;
    }

    preUpdate(){
        if(this.y>=780){//esto es por si se cae, luego no será necesario
            this.lives=false;
     }
    if(this.lives<=0){
         this.start()
    }
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
