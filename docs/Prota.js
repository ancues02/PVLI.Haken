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
        // this.invokeDash = setInterval(() => {
        //     this.body.setVelocityX(this.direction.x * this.dashSpeed);
        // }, 100);
        this.dashTime = 10;
        this.dashStartTime = 0;
        this.dashing = false;
        this.dashSpeed = 600;
        this.dashAvailble = true;
        //teclas para manejo de eventos
        this.a=scene.input.keyboard.addKey("A");
        this.d=scene.input.keyboard.addKey("D");
        this.w=scene.input.keyboard.addKey("W");
        this.s=scene.input.keyboard.addKey("S");
        this.space=scene.input.keyboard.addKey("SPACE");
        this.k=scene.input.keyboard.addKey("K");
        this.j=scene.input.keyboard.addKey("J"); //tecla del dash
    }
    dash(){
        this.body.setVelocityX(this.direction.x * this.dashSpeed);
        
    }
    addPoint(){
        this.points++;
        //this.updateScore();
        console.log(this.points);
    }
    start(){
        this.y= this.startPos.y;
        this.x=this.startPos.x;
        this.dimension=true;
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
    if(this.dashing){
        if(this.dashStartTime < this.dashTime){
            //clearInterval()
            
            // this.x += this.direction.x * this.dashSpeed;
            // this.y += this.direction.y * this.dashSpeed;
            this.dashStartTime++;
            console.log("Hallome dasheando");
        }
        else{
            this.dashing = false;
            this.dashStartTime = 0;
            this.body.setVelocityY(0);
            setTimeout(() => { this.dashAvailble = true}, 1000)
        }
    }
    else{
        if(this.w.isDown){
            super.changeDirectionY(-1);
        }
        else if(this.s.isDown){
            super.changeDirectionY (1);
        }
        else if(this.a.isDown){
            //if(this.x>0)
            //this.body.setVelocityX(-this.dimValue * this.speed)
            //super.horizontalMove(-1);
            super.changeDirectionX(-1 * this.dimValue);
            super.horizontalMove();
        }else if(this.d.isDown){
            //if(this.x< 700)
            //super.horizontalMove(1); 
            super.changeDirectionX(1 * this.dimValue);
            super.horizontalMove();    
        }
        else{
            //super.horizontalMove(0);
            this.changeDirectionX(0);
            this.changeDirectionY(0);
            super.stop();
        }
        
        //jump
        if(this.space.isDown && this.body.onFloor()){
            this.body.setVelocityY(this.jumpImpulse);
        }
        //Dash
        if(this.dashAvailble && Phaser.Input.Keyboard.JustDown(this.j)){
           
           
            //this.dash();  
            // this.body.setVelocityX(this.direction.x * this.dashSpeed);
            // this.body.setVelocityY(this.direction.y * this.dashSpeed);
            //this.dash();
            //setInterval(this.dash, 100);
            //this.invokeDash.apply(this);
            this.body.setVelocityX(this.direction.x * this.dashSpeed);
            this.body.setVelocityY(this.direction.y * this.dashSpeed);
            this.dashAvailble = false;
            this.dashing = true;
            /*setInterval(() => {
                this.body.setVelocityX(this.direction.x * this.dashSpeed);
                console.log("Hallome dasheando");
                this.dashing = true;
                this.dashStartTIme++;
            }, 100);*/
            //console.log("Hallome dasheando");
        }
    }
    
    // if (this.scene.physics.overlap(this, this.scene.platforms)){
    //     clearInterval(this.dashTime);
    // }
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
