import Personaje from './Personaje.js';  //esto esta aqui porque funciona
export default class Prota extends Personaje {
    constructor(scene, x,y, speed, dir, points, jumpImpulse,lives, sprite,espada,espadaAtacando,shield){
        super(scene,x,y, speed, dir, points, lives, sprite);
        //this.yoMismo= this.scene.add.sprite(0,0,sprite); //quitar
        this.espada= this.scene.add.sprite(20,0,espada);
        this.espadaAtacando= this.scene.add.sprite(20,0,espadaAtacando);

        //super.setSize(this.yoMismo.width-5,this.yoMismo.height); //ajustar
        //console.log(this.yoMismo.width);  //quitar 

       //this.scene.add.existing(this);    //quitar
        
        this.shield= this.scene.add.sprite(0,0,shield);
        this.shield.setAlpha(0.8);
        //this.add(this.yoMismo); //quitar
        this.add(this.espada);
        this.add(this.espadaAtacando);
        this.add(this.shield);
        this.espadaAtacando.setVisible(false);
        this.shield.setVisible(false);
    //    this.scene.physics.add.existing(this); // qui
    //     this.lives = lives;
    //     this.direction = dir;
    //     this.speed = speed;
    //     this.points = points;             //tar
        this.startPos={x: x, y: y};
        this.jumpImpulse = jumpImpulse;
        this.springPicked=false;//para saltar más cuando pillas un spring
        this.dimValue = 1; //1 == lado izq, -1 == lado derecho
        
        this.damageCD = true;//es para controlar que los enemigos no hagan daño todo el rato       
        
        //variables para el ataque
        this.attackTime=0;
        this.attackDuration = 250;
        this.attacking=false;
        //variables para el dash
        this.dashingTime = 0; //el tiempo que esta haciendo dash (dashDuration + time) 
        this.dashDuration=250;//tiempo que esta usando el dash
        this.dashCd = 1500;//es el cd del dash
        this.noDash=0;//el tiempo que no puede usar el dash(time+dashCd)
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
        this.body.setMaxVelocity(500,800);


    }
    preUpdate(time, delta){
        //if(this.body.onWall())console.log("holaaaaaaaaaaaaaaaaaaaa");
        //console.log(delta);
        if(this.y >= 3100){//esto es por si se cae, luego no será necesario
            this.scene.changeScene('Game')
        }
        // if(!this.espada.visible){
        //     if(this.attackTime===0){
        //        this.attackTime=time+250;
        //         //console.log(this.attackTime);
        //     }
        //     else if(this.attackTime<=time){
        //         this.espada.setVisible(true);
        //         this.espadaAtacando.setVisible(false);
        //         this.attackTime=0;
        //         this.attacking=false;
        //     }
        // }
        if(this.attacking){                //Estado ataque
            if(this.attackTime<=time){
                this.espada.setVisible(true);
                this.espadaAtacando.setVisible(false);
                this.attackTime=0;
                this.attacking=false;
            }
        }
        else if(this.dashing){               //Estado dash          
            if(this.dashingTime <= time){
                this.dashing = false;
                
                this.dashingTime = 0;             
                if(this.body.velocity.y<=0)  {
                    //si se usa dash hacia arriba se para, si es para abajo que siga bajando
                    this.body.setVelocityY(0);
                }
                //this.scene.time.addEvent({ delay: 2000, callback: () => {console.log("reseteo el dash");}, callbackScope: this });
                this.body.setAllowGravity(true);//aunque pongas la velocity en 0, sigue afectando la gravedad parece
                this.espada.setRotation(0);
                this.espadaAtacando.setRotation(0);
                this.noDash=this.dashCd+time;
            }
        }
        //estado normal
        else {  
            if(!this.dashAvailable){    //cd del dash
                if(this.noDash<=time){
                    this.dashAvailable=true;
                }
            }  
            //Movimiento                      
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
                //this.changeDirectionX(0);
                this.stop();
            }
            
            //jump
            if(this.space.isDown && this.body.onFloor()){
                if(this.springPicked){      //en vez de esto, cuando pulsas, hace un callback a una funcion que reseta jumpimpulse, na
                    this.body.setVelocityY(1.5*this.jumpImpulse);
                    this.springPicked=false;
                }
                else{
                    this.body.setVelocityY(this.jumpImpulse);
                }
            }
            //Dash
            //dinstinguimos diferentes casos para colocar la espada
            //creo que podemos poner un script a la espada para que se gire y ahorrarnos comparaciones
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
                //console.log("antes:   "+this.body.velocity.y);
                if(Math.abs(this.direction.y) === Math.abs(this.direction.x)){     //dash diagonal mas razonable
                    this.body.setVelocityX(0.7* this.direction.x * this.dashSpeed);
                    this.body.setVelocityY(0.7 * this.direction.y * this.dashSpeed);
                    //console.log("en");
                }
                else{
                    this.body.setVelocityX(this.direction.x * this.dashSpeed);
                    this.body.setVelocityY(this.direction.y * this.dashSpeed);
                }
                
                this.body.setAllowGravity(false);
                this.dashAvailable = false;
                this.dashing = true;
                this.dashingTime = time + this.dashDuration;
                //console.log("Limite= " + this.dashingTime);
                //console.log("despues:   "+this.body.velocity.y);

                
            }
            else if (!this.attacking && this.direction.x == 0 && this.direction.y == 0 && Phaser.Input.Keyboard.JustDown(this.j)){
                this.espada.setVisible(false);
                this.espadaAtacando.setVisible(true);
                this.attacking=true;
                this.attackTime = time + this.attackDuration;

            }
        }
        
        //Cambio de dimension
        if(Phaser.Input.Keyboard.JustDown(this.k)){
           // console.log(this.x);
            this.changeDimValue();
            if(this.x<=710 && this.x>=0){
                this.x += 752;

            }
            else{
                 this.x -=752;
            }
     
        }
        
        
    }
    isDashing(){
        return this.dashing;
    }
    isAttacking(){
        return this.attacking;
    }
    //para saber si estas mirando al enemigo o no
    getFlipped(){
        return this.yoMismo.flipX;
    }
    addPoint(points){
        this.points+=points;
        
        //console.log(this.points);
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
    decreaseHealth(){
        if(this.damageCD)
        {
            this.lives--;
            if(this.lives === 1){
                this.damageCD = false;
                this.shield.setVisible(false);

                setTimeout(()=>this.damageCD = true,2000); //cambiar esto
            }
            else if(this.lives<=0){
                this.scene.changeScene('Game')
            }
        }
        
    }
    changeDirectionX(nx){   
        // if(nx===-1){
        //     this.espada.x=-20;
        //     this.espada.setFlipX(true); 
        //     this.espadaAtacando.x=-20;
        //     this.espadaAtacando.setFlipX(true);
        //     this.yoMismo.setFlipX(true);
        // }
        // else if(nx===1){
        //     this.espada.setFlipX(false);
        //     this.espada.x=20;
        //     this.espadaAtacando.x=20;
        //     this.espadaAtacando.setFlipX(false);
        //     this.yoMismo.setFlipX(false);
        // }
        //lo de arriba me fallaba cuando se le pasaba 0 como parametro
        //sii ponemos esto, se pone la espada en el centro cuando la direccion en x es 0
        this.espada.x=nx * 20;
        this.espada.setFlipX(nx === -1); 
        this.espadaAtacando.x= nx* 20;
        this.espadaAtacando.setFlipX(nx === -1);
        this.yoMismo.setFlipX(nx === -1);
        this.direction.x = nx;
        
    }
    

}
