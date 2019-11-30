//import Personaje from './Personaje.js';  //esto esta aqui porque funciona
export default class Prota extends Phaser.GameObjects.Container  {
    constructor(scene, x,y, speed, dir, points, jumpImpulse,lives, sprite,espada,shield){
        super(scene,x,y);
        super.setSize(15,15);

        this.scene.add.existing(this);
        this.yoMismo= this.scene.add.sprite(0,-10,sprite)
        this.add(this.yoMismo)
        //this.add(this.epada)
        //scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.lives = lives;//es por si muere poder resetear su posicion / vida
        this.direction = dir;
        this.speed = speed;
        this.points = points;



        this.container=this.scene.add.container(200,300);
        this.sprite1= this.scene.add.sprite(20,180,espada);
        //this.container.add(this.sprite1);



        this.startPos={x: x, y: y};
        this.shield=shield;//escudo, protege de un golpe
        //this.lives=1;//es por si muere poder resetear su posicion
        //this.dimension= true; //true -> lado izquierdo; 
        this.jumpImpulse = jumpImpulse;
        this.dimValue = 1; //1 == lado izq, -1 == lado derecho
        this.damageCD = true;//es para controlar que los enemigos no hagan daño todo el rato
        // this.invokeDash = setInterval(() => {
        //     this.body.setVelocityX(this.direction.x * this.dashSpeed);
        // }, 100);
        //this.nameScene=scene;
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

        
        //this.container.add(this.sprite1);
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
    decreaseHealth(){
        if(this.damageCD)
        {
            this.decreaseHealthProta();
            if(this.lives === 1){
                this.damageCD = false;
                setTimeout(()=>this.damageCD = true,2000); //desactivar escudo
            }
            else if(this.lives<=0){
                this.scene.changeScene('Game')
            }
        }
        
    }
    changeJumpImpulse(){
        let aux = this.jumpImpulse;
        this.jumpImpulse = 1.5 * this.jumpImpulse;
        setTimeout(() => {this.jumpImpulse = aux}, 2000);
    }
    resetDash(){
        this.dashAvailable = true;
    }
    shielded(){
        if(this.lives === 1)this.lives++;
     //activar el shield del contenedor
    }
    changeDimValue(){
        this.dimValue *= -1;
    }
    preUpdate(time, delta){
        console.log(this.x)
    if(this.y >= 3100){//esto es por si se cae, luego no será necesario
        this.scene.changeScene('Game')
        
    }
    


    if(this.dashing){
        if(this.dashStartTime < this.dashTime){
            
            this.dashStartTime++;
        }
        else{
            this.dashing = false;
            this.dashStartTime = 0;
            this.body.setVelocityY(0);
            setTimeout(() => { this.dashAvailable = true}, 1500)
        }
    }
    else{
        if(this.w.isDown){
            this.changeDirectionY(-1);
        }
        else if(this.s.isDown){
            this.changeDirectionY (1);
            
        }
        else{
            this.changeDirectionY(0);
        }
        if(this.a.isDown){
            
            this.changeDirectionX(-1 * this.dimValue);
            this.horizontalMove();
        }else if(this.d.isDown){
             
            this.changeDirectionX(1 * this.dimValue);
            this.horizontalMove();    
        }
        else{
            this.changeDirectionX(0);
            this.stop();
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
 decreaseHealthProta(){
    this.lives--;
}
changeDirectionX(nx){
    this.direction.x = nx;
    // this.direction.x = nx;
    // this.direction.y = ny;
}
changeDirectionY(ny){
    this.direction.y = ny;
}
stop(){
    this.body.setVelocityX(0);
}
horizontalMove(){
    this.body.setVelocityX(this.direction.x * this.speed);
}
verticalMove(){
    this.body.setVelocityY(this.direction.y * this.speed);
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



    

}
