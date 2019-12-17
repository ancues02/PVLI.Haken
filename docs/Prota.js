import Personaje from './Personaje.js'; 
const state = {
    NORMAL: 0,
    DASH: 1,
    ATTACK: 2
}
export default class Prota extends Personaje {
    constructor(scene, x,y, speed, dir, points, jumpImpulse,lives, sprite,espada,espadaAtacando,shield){
        super(scene,x,y, speed, dir, points, lives, sprite);
        //animaciones
        this.scene.anims.create({//animacionde estar quieto
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers(sprite, { start: 33, end: 36 }),
            frameRate: 3,
            repeat: -1
        });this.scene.anims.create({//animacion de estar en movimiento(pulsando a o d en el suelo)
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers(sprite, { start: 17, end: 19 }),
            frameRate: 3,
            repeat: -1
        });this.scene.anims.create({//animacion de salto
            key: 'jump',
            frames: this.scene.anims.generateFrameNumbers(sprite, { start: 30, end: 30 }),
            frameRate: 2,
            repeat: 0
        });this.scene.anims.create({//animacion  despues de salto y de caer
            key: 'jumpDown',
            frames: this.scene.anims.generateFrameNumbers(sprite, { start: 47, end: 47 }),
            frameRate: 1,
            repeat: 0
        });
        this.scene.anims.create({//animaicon del dash
            key: 'dash',
            frames: this.scene.anims.generateFrameNumbers(sprite, { start: 77, end: 77 }),
            frameRate: 1,
            repeat: -1
        });  this.scene.anims.create({//animacion de cambio de pantalla
            key: 'swap',
            frames: this.scene.anims.generateFrameNumbers(sprite, { start: 80, end: 80 }),
            frameRate: 8,
            repeat: 0
        });this.scene.anims.create({//animacion de cuando te hacen daño
            key: 'hurting',
            frames: this.scene.anims.generateFrameNumbers(sprite, { start: 6, end: 7 }),
            frameRate: 8,
            repeat: 6
        });
        this.yoMismo.anims.play('idle');
        
        this.state = state.NORMAL;
        this.espada= this.scene.add.sprite(20,0,espada);
        this.espadaAtacando= this.scene.add.sprite(20,0,espadaAtacando);
        this.shield= this.scene.add.sprite(0,0,shield);
        this.shield.setAlpha(0.8);
        
        this.add(this.espada);
        this.add(this.espadaAtacando);
        this.add(this.shield);
        this.espadaAtacando.setVisible(false);
        this.shield.setVisible(false);
    
        this.finalScore=0;
        this.startPos={x: x, y: y};
        this.jumpImpulse = jumpImpulse;
        this.springPicked=false;//para saltar más cuando pillas un spring
        this.dimValue = 1; //1 == lado izq, -1 == lado derecho
        this.changeMov=false;
        this.changeMovTime=10000//10 segundos con los controles invertidos

        this.immune = true;//es para controlar que los enemigos no hagan daño todo el rato       
        //variables para el ataque
        //this.attackTime=0;
        this.attacking=false;
        this.attackDuration = 0;
        //variables para el dash
        this.dashing = false;//para hacer daño mientras usas el dash
        this.dashAvailable = true;//para poder hacer dash
        //this.dashingTime = 0; //el tiempo que esta haciendo dash (dashDuration + time) 
        this.dashDuration=0;//tiempo que esta usando el dash, si es 0, puedes usar el dash
        this.dashCd = 0;//es el cd del dash
        //this.noDash=0;//el tiempo que no puede usar el dash(time+dashCd)
        this.dashSpeed = 600;//la velocidad a la que te mueves
        this.noChange=false;//cuando es true no puedes cambiar de lado
       
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
        if(this.y >= 6330){//para saber si llegamos al final
            this.end();      
        }
        if( this.yoMismo.anims.getCurrentKey()!='hurting') this.immune=true;        //para volver a recibir daño cuando la animación de daño termina
        switch(this.state){
            case state.ATTACK:
                this.attackDuration = Math.max(0, this.attackDuration - delta);
                if(this.attackDuration === 0){
                    this.state = state.NORMAL;
                    this.espada.setVisible(true);
                    this.espadaAtacando.setVisible(false);            
                }
                break;
            case state.DASH:
                this.yoMismo.anims.play('dash');
                this.dashDuration = Math.max(0, this.dashDuration - delta);
                if(this.dashDuration === 0){
                    this.state = state.NORMAL;
                    if(this.body.velocity.y<=0)  {
                        //si se usa dash hacia arriba se para, si es para abajo que siga bajando
                        this.body.setVelocityY(0);
                    }
                    this.body.setAllowGravity(true);//aunque pongas la velocity en 0, sigue afectando la gravedad parece
                    this.espada.setRotation(0);
                    this.espadaAtacando.setRotation(0);
                    this.dashCd = 1500;
                    this.espada.setVisible(true);
                    this.espadaAtacando.setVisible(false);
                }
                break;
            case state.NORMAL:
                if(!this.dashAvailable){    //cd del dash       
                    this.dashCd = Math.max(0, this.dashCd - delta);
                    if(this.dashCd === 0){
                        this.dashAvailable = true;
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
                        if(this.yoMismo.anims.getCurrentKey()!='walk' &&  this.yoMismo.anims.getCurrentKey()!='hurting' && this.yoMismo.anims.getCurrentKey()!='swap'){
                                this.yoMismo.anims.play('walk');
                        }
                        if(this.changeMov){
                            this.changeDirectionX(1 * this.dimValue);

                        }
                        else  this.changeDirectionX(-1 * this.dimValue);

                    this.horizontalMove();
                }else if(this.d.isDown){
                        if(this.yoMismo.anims.getCurrentKey()!='walk'&& this.yoMismo.anims.getCurrentKey()!='hurting' && this.yoMismo.anims.getCurrentKey()!='swap'){
                            this.yoMismo.anims.play('walk');
                            //this.changeAnim=false;
                        }    
                        if(this.changeMov){
                            this.changeDirectionX(-1 * this.dimValue);

                        }
                        else  this.changeDirectionX(1 * this.dimValue);          
                        this.horizontalMove();    
                    }
                    else{
                        this.stop();
                        //haces la animacion idle si no estás en esa animacion ni otras porque aqui entras si no se pulsa 'a' o 'd'
                        if(this.yoMismo.anims.getCurrentKey()!='idle' && this.yoMismo.anims.getCurrentKey()!='jump'&&
                        this.yoMismo.anims.getCurrentKey()!='jumpDown' && this.yoMismo.anims.getCurrentKey()!='swap'
                        && this.yoMismo.anims.getCurrentKey()!='hurting'){
                            
                            this.yoMismo.anims.play('idle');
                    }               

                }
                //para dejar de animar que caes
                if(this.yoMismo.anims.getCurrentKey()==='jumpDown' && this.body.onFloor() ){
                    this.yoMismo.anims.play('idle');
                    //this.scene.jumpSound.stop();
                }
                //para animar que caes
                if(!this.body.onFloor() &&  !this.dashing && this.yoMismo.anims.getCurrentKey()!='swap' &&
                this.yoMismo.anims.getCurrentKey()!='hurting' ) {
                    this.yoMismo.anims.play('jumpDown');
                }
                //jump
                else if(this.space.isDown && this.body.onFloor()){
                
                    this.yoMismo.anims.play('jump');
                    this.yoMismo.anims.chain('jumpDown');
                    this.scene.jumpSound.play();
                    if(this.springPicked){      
                        this.body.setVelocityY(1.5*this.jumpImpulse);
                        this.springPicked=false;
                    }
                    else{
                        this.body.setVelocityY(this.jumpImpulse);
                    }
                }
                //Dash y ataque
                if(Phaser.Input.Keyboard.JustDown(this.j)){
                    if(this.isStill()){ //si estoy quieto, ataco
                        this.espada.setVisible(false);
                        this.espadaAtacando.setVisible(true);
                        this.state = state.ATTACK;
                        this.attackDuration = 250;
                    }
                    else if(this.dashAvailable){   //si me estoy moviendo, hago el dash
                        this.scene.dashSound.play();
                        this.placeSword();
                        if(Math.abs(this.direction.y) === Math.abs(this.direction.x)){     //dash diagonal mas razonable
                            this.body.setVelocityX(0.7* this.direction.x * this.dashSpeed);
                            this.body.setVelocityY(0.7 * this.direction.y * this.dashSpeed);
                        }
                        else{
                            this.body.setVelocityX(this.direction.x * this.dashSpeed);
                            this.body.setVelocityY(this.direction.y * this.dashSpeed);
                        }
                        this.body.setAllowGravity(false);
                        this.dashAvailable = false;
                        this.state = state.DASH;
                        this.dashDuration = 250;
                    }
                }
                break; 

        }
    
        //empieza la animacion de cambio de dimension que realmente te cambia de dimension al acabar la animacion
        if(Phaser.Input.Keyboard.JustDown(this.k) && !this.noChange ){
            this.yoMismo.anims.play('swap');
            
        }
        //siempre hay una animacion excepto cuando acaba la animacion swap que entonces nos cambiamos de lado
        if(!this.yoMismo.anims.isPlaying){
            this.yoMismo.anims.play('idle');
            if(this.checkChange()){
                this.scene.changeSideSound.play();
                this.x += (this.dimValue * this.scene.dimMargin);
                this.changeDimValue();
            }
        }

        this.checkSpike();
        this.checkNoChange();
    }

    //Comprueba si a donde vas a cambiar hay una un obstaculo
    //si es null, es que no hay plataforma, por tanto es posible el cambio
    checkChange(){
        return this.scene.layerPlatform.getTileAtWorldXY(this.x + (this.dimValue * this.scene.dimMargin), this.y) === null;    
    }

    checkSpike(){//comprueba si 
        if(this.scene.layerSpike.getTileAtWorldXY(this.x, this.y) != null){
            this.decreaseHealth(1);
        }
    }
    checkNoChange(){//comprueba si puedes cambiar de lado
        this.noChange=this.scene.layerNoChange.getTileAtWorldXY(this.x, this.y) != null;
    }
    canChange(){//para el texto de si puedes o no cambiar de lado
        if(this.noChange) return "NO";
        else return "SÍ";
    }
    isStill(){
        return (this.direction.x == 0 && this.direction.y === 0);
    }
    isDashing(){
        return this.state === state.DASH;
    }
    isAttacking(){
        return this.state === state.ATTACK;
    }
    placeSword(){
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
        }else if(this.direction.y===-1 && this.direction.x===0){//arriba
                    
            if(this.espada.flipX)   this.espada.setRotation(0.78)
             else this.espada.setRotation(-0.78)

        }
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
    //para que algunos enemigos sepan en que lado está
    getDimValue(){//1 lado izquierdo
        return this.dimValue;
    }
    //te quita vida o cambia de escena si no te quedan vidas
    decreaseHealth(damage){
        if(this.immune)
        {
            this.yoMismo.anims.play('hurting');
            this.yoMismo.anims.chain('idle');
            this.lives-=damage;
            if(this.lives === 1){
                this.immune = false;
                this.shield.setVisible(false);
            }
            else if(this.lives<=0){
                this.scene.mainTheme.stop();
                this.scene.playerDeathSound.play();
                this.end();
            
            }
        }
        
    }
    end(){
        this.finalScore=Math.round((this.points*this.y/10)/Math.round(this.scene.time/1000));//formula que da tu puntuacion final
        this.scene.addText();
        this.scene.scene.pause();
        this.scene.scene.sendToBack();
        this.scene.scene.run('Death');
    }
      //es para poner el texto de si puedes o no dashear
    canDash(){
        if(!this.dashAvailable){
            return "NO";

        }
        else return "SÍ";
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
        
    }
    getFinalScore(){
       
        return this.finalScore;
    }
    

}
