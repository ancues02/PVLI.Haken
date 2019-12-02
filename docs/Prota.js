//import Personaje from './Personaje.js';  //esto esta aqui porque funciona
export default class Prota extends Phaser.GameObjects.Container  {
    constructor(scene, x,y, speed, dir, points, jumpImpulse,lives, sprite,espada,espadaAtacando,shield){
        super(scene,x,y);
        this.yoMismo= this.scene.add.sprite(0,0,sprite);
        this.espada= this.scene.add.sprite(20,0,espada);
        this.espadaAtacando= this.scene.add.sprite(20,0,espadaAtacando);

        super.setSize(this.yoMismo.width-5,this.yoMismo.height);
        //console.log(this.yoMismo.width);

        this.scene.add.existing(this);
        
        this.shield= this.scene.add.sprite(0,0,shield);
        this.shield.setAlpha(0.8);
        this.add(this.yoMismo);
        this.add(this.espada);
        this.add(this.espadaAtacando);
        this.add(this.shield);
        this.espadaAtacando.setVisible(false);
        this.shield.setVisible(false);
        this.scene.physics.add.existing(this);
        this.lives = lives;
        this.direction = dir;
        this.speed = speed;
        this.points = points;
        this.startPos={x: x, y: y};
        this.jumpImpulse = jumpImpulse;
        this.springPicked=false;//para saltar más cuando pillas un spring
        this.dimValue = 1; //1 == lado izq, -1 == lado derecho
        
        this.damageCD = true;//es para controlar que los enemigos no hagan daño todo el rato       
        
        this.attackTime=0;
        this.attacking=false;
        //variables para el dash
        this.dashingTime = 10;
        this.dashingStartTime = 0;
        this.dashCd=1500;//para poder volver usar el dash(1.5 segundos)
        this.dashing = false;//para hacer daño mientras usas el dash
        this.dashSpeed = 600;//la velocidad a la que te mueves
        this.dashAvailable = true;//para poder hacer dash
       
        //teclas para manejo de eventos
        this.a=scene.input.keyboard.addKey("A");//moverte izquierda
        this.d=scene.input.keyboard.addKey("D");//moverte derecha
        this.w=scene.input.keyboard.addKey("W");//mirar arriba
        this.s=scene.input.keyboard.addKey("S");//mirar abajo
        this.space=scene.input.keyboard.addKey("SPACE");//saltar
        this.k=scene.input.keyboard.addKey("K");// cambiar de lado
        this.j=scene.input.keyboard.addKey("J"); //  dash

        //ponemos un maximo de velocidades
        this.body.setMaxVelocity(500,800)


    }
    isDashing(){
        return this.dashing;
    }
    isAttacking(){
        return this.attacking;
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
                this.shield.setVisible(false);

                setTimeout(()=>this.damageCD = true,2000); 
            }
            else if(this.lives<=0){
                this.scene.changeScene('Game')
            }
        }
        
    }
    changeJumpImpulse(){
        this.springPicked=true;
    }
    resetDash(){
        this.dashAvailable = true;
    }
    //cuando cogemos un escudo, ponemos como
    // maximo una vida mas y se ve el escudo
    shielded(){
        if(this.lives === 1){
            this.lives++;
            this.shield.setVisible(true);

        }
    }
    changeDimValue(){
        this.dimValue *= -1;
    }
    preUpdate(time, delta){

        if(this.y >= 3100){//esto es por si se cae, luego no será necesario
            this.scene.changeScene('Game')
            
        }
        if(!this.espada.visible){
            if(this.attackTime===0){
               this.attackTime=time+250;

            }
            else if(this.attackTime<=time){
                this.espada.setVisible(true);
                this.espadaAtacando.setVisible(false);
                this.attackTime=0;
                this.attacking=false;
            }
        }
        if(!this.dashAvailable ){
            if(this.dashing){
                this.dashCd=time+1500;//1,5 segundos de cd
                
            }
            else{
                if(this.dashCd<=time){
                    this.dashAvailable=true;
                }
            
            }
        }
        if(this.dashing){

            if(this.dashingStartTime < this.dashingTime){
                
                this.dashingStartTime++;
            }
            else{
                this.dashing = false;
                this.dashingStartTime = 0;
                this.body.setVelocityY(0);
                this.espada.setRotation(0);
                this.espadaAtacando.setRotation(0);
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
                if(this.springPicked){
                    this.body.setVelocityY(1.5*this.jumpImpulse);
                    this.springPicked=false;
                }
                else{
                    this.body.setVelocityY(this.jumpImpulse);
                }
            }
            //Dash
            //dinstinguimos diferentes casos para colocar la espada
            if(this.dashAvailable && (this.direction.x != 0 || this.direction.y != 0) && Phaser.Input.Keyboard.JustDown(this.j)){
                if(this.direction.y===0) {//lados
                    this.espada.setVisible(false);
                    this.espadaAtacando.setVisible(true);
                }
                else if(this.direction.y===1){
                    if(this.direction.x===1){//abajo a la derecha
                        this.espada.setRotation(1.5);
                    }
                    else if(this.direction.x===-1){//abajo a la izquierda
                        this.espada.setRotation(4.7);

                    }
                    else{//abajo
                        
                        this.espada.setVisible(false);
                        this.espadaAtacando.setVisible(true);
                        if(this.espadaAtacando.flipX)  this.espadaAtacando.setRotation(-1.5);
                        else this.espadaAtacando.setRotation(1.5);
                    }
                }
                else if(this.direction.y===-1 && this.direction.x===0){//arriba
                    
                    if(this.espada.flipX)   this.espada.setRotation(0.78)
                    else this.espada.setRotation(-0.78)

                }
                
                this.body.setVelocityX(this.direction.x * this.dashSpeed);
                this.body.setVelocityY(this.direction.y * this.dashSpeed);
                this.dashAvailable = false;
                this.dashing = true;
                
            }
            else if (!this.attacking && this.direction.x == 0 && this.direction.y == 0 && Phaser.Input.Keyboard.JustDown(this.j)){
                this.espada.setVisible(false);
                this.espadaAtacando.setVisible(true);
                this.attacking=true;

            }
        }
        
        //Cambio de dimension
        if(Phaser.Input.Keyboard.JustDown(this.k)){
            
            console.log(this.x);
            this.changeDimValue();//658
            if(this.x<=710 && this.x>=0){
                this.x += 752;

            }
            else{//658
               // if(this.x>=1300) this.x -=750;
                 this.x -=752;
            }
            
        }
        
    }
    decreaseHealthProta(){
        this.lives--;
    }
    changeDirectionX(nx){
        if(nx===-1){
            this.espada.x=-20;
            this.espada.setFlipX(true); 
            this.espadaAtacando.x=-20;
            this.espadaAtacando.setFlipX(true);
            this.yoMismo.setFlipX(true);
        }
        else if(nx===1){
            this.espada.setFlipX(false);
            this.espada.x=20;
            this.espadaAtacando.x=20;
            this.espadaAtacando.setFlipX(false);
            this.yoMismo.setFlipX(false);
        }
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
    //para saber si estas mirando al enemigo o no
    getFlipped(){
        return this.yoMismo.flipX;
    }

}
