import Personaje from './Personaje.js';  //esto esta aqui porque funciona
export default class Prota extends Personaje  {
    constructor(scene, x,y, speed, dir, points, jumpImpulse,lives, sprite,espada){
        super(scene,x,y, speed, dir, points, lives,sprite);
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
        this.dashAvailable = true;
        //teclas para manejo de eventos
        this.a=scene.input.keyboard.addKey("A");
        this.d=scene.input.keyboard.addKey("D");
        this.w=scene.input.keyboard.addKey("W");
        this.s=scene.input.keyboard.addKey("S");
        this.space=scene.input.keyboard.addKey("SPACE");
        this.k=scene.input.keyboard.addKey("K");
        this.j=scene.input.keyboard.addKey("J"); //tecla del dash

        this.container=this.scene.add.container(200,300);
        this.sprite1= this.scene.add.sprite(20,180,espada);
        this.container.add(this.sprite1);
        //this.container.add(this);
        //this.container.setSize(128, 64);
        //this.scene.physics.add.existing(this.container);
        //this.physics.world.enable(this.container);
        //this.container.body.collideWorldBounds=true;
        this.body.setMaxVelocity(500,800)


    }
    isDashing(){
        return this.dashing;
    }
    getContainer(){
        return this.container;
    }
    addPoint(points){
        this.points+=points;
        //this.updateScore();
        console.log(this.points);
    }
    changeJumpImpulse(){
        let aux = this.jumpImpulse;
        this.jumpImpulse = 1.5 * this.jumpImpulse;
        setTimeout(() => {this.jumpImpulse = aux}, 2000);
    }
    resetDash(){
        this.dashAvailable = true;
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
    if(this.y >= 3100){//esto es por si se cae, luego no será necesario
        this.lives = 0;
    }
    if(this.lives<=0){
        this.start()
    }


    if(this.dashing){
        if(this.dashStartTime < this.dashTime){
            
            this.dashStartTime++;
        }
        else{
            this.dashing = false;
            this.dashStartTime = 0;
            this.body.setVelocityY(0);
            setTimeout(() => { this.dashAvailable = true}, 1000)
        }
    }
    else{
        if(this.w.isDown){
            super.changeDirectionY(-1);
        }
        else if(this.s.isDown){
            super.changeDirectionY (1);
            
        }
        else{
            this.changeDirectionY(0);
        }
        if(this.a.isDown){
            
            super.changeDirectionX(-1 * this.dimValue);
            super.horizontalMove();
        }else if(this.d.isDown){
             
            super.changeDirectionX(1 * this.dimValue);
            super.horizontalMove();    
        }
        else{
            this.changeDirectionX(0);
            super.stop();
        }
        
        //jump
        if(this.space.isDown && this.body.onFloor()){
            this.body.setVelocityY(this.jumpImpulse);
        }
        //Dash
        if(this.dashAvailable && (this.direction.x != 0 || this.direction.y != 0) && Phaser.Input.Keyboard.JustDown(this.j)){
           
           
            
            this.body.setVelocityX(this.direction.x * this.dashSpeed);
            this.body.setVelocityY(this.direction.y * this.dashSpeed);
            this.dashAvailable = false;
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
    
    //Cambio de dimension
    if(Phaser.Input.Keyboard.JustDown(this.k)){
         
        console.log(this.x);
        this.changeDimValue();
        if(this.x<=750 && this.x>=0){
            this.x += 750;

        }
        else{
        this.x -=750;
        }
        
    }
    
 }

    

}
