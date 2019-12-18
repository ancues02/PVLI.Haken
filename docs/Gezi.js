import Enemy from './Enemy.js'; 
export default class Gezi extends Enemy  {
    
    constructor(scene, x,y, speed, dir, points, damage, lives,group,  sprite){
        super(scene,x,y, speed, dir, points, damage,lives,group, sprite);
        this.pared=false;
        this.distance=200;
        this.body.setMaxVelocity(speed,speed);
        this.body.setAllowGravity(false);
        this.goDown=true;
        this.startMove=false;
        this.scene.anims.create({
            key: 'geziAnim',
            frames: this.scene.anims.generateFrameNumbers(sprite, { start: 6, end: 7}),
            frameRate: 3,
            repeat: -1
        });
        this.yoMismo.anims.play('geziAnim');
    }
    
    preUpdate(){
        //esto es que comprueba que no se sale de los limites no?
        if(this.y<=10) this.changeDirectionY(1);
       
        //empieza bajando hasta encontrar suelo 
        if(this.goDown){
            //this.body.setAllowGravity(true);
            this.changeDirectionY(1);
            this.changeDirectionX(1);

            this.verticalMove();//lo movemos
            
            if (this.body.onFloor()) this.goDown=false;
        }
        else {
            //se empieza a mover solo si coincide que el personaje esta en su mismo lado y a una cierta distancia
            if(!this.startMove ){
                if(this.y-this.scene.player.y<=this.distance && (this.x<this.scene.dimMargin && this.scene.player.getDimValue()===1
                 || this.x>this.scene.dimMargin && this.scene.player.getDimValue()===-1 )){
                    this.startMove=true;
                }
            }
            else{
                if(this.body.onCeiling()){//y tiene que ser -1
                //console.log("Entro en techo")
                    this.body.angle=180;
                    this.angle=180;
                    if(this.body.onWall()){
                        if(!this.pared){//estabas yendo por el techo hasta tocar el muro
                            //console.log("de techo paso a pared")
                            this.changeDirectionY(1)
                        }
                        else{
                            //console.log("de pared paso a techo")
                            if(this.direction.x===1){//se mueve a la derecha
                                this.x-=10;
                            
                            }
                            else {
            
                                this.x+=10;
                            }
                            //this.x-=10
                            this.changeDirectionX(-this.direction.x);

                        }
                    

                    }
                    this.pared=false;           
                }
                else if(this.body.onFloor()){//y tiene que ser 1
                    this.body.angle=0;
                    this.angle=0;
                    if(this.direction.x===1)   this.yoMismo.setFlipX(false);
                    else this.yoMismo.setFlipX(true);
                    //console.log("ENTRO EN FLOOR")
                    if(this.body.onWall()){
                        //this.suelo=false;
                        if(this.body.onWall()){
                            if(!this.pared){//estabas yendo por el suelo hasta tocar el muro
                                //console.log("de suelo paso a pared")
                                this.changeDirectionY(-1)
                            }
                            else{
                                //console.log("de pared paso a suelo")
                                if(this.direction.x===1){//se mueve a la derecha
                                    this.x-=10;
                                
                                }
                                else {
                
                                    this.x+=10;
                                }
                                this.changeDirectionX(-this.direction.x);
            
                            }
                            //this.techo=false;
                            //this.changeDirectionY(1);
            
                        }

                    }
                    this.pared=false;
                    
                }
                else if(this.body.onWall() ){//x tiene que ser -1 o 1
                   
                    if(this.direction.x===-1){
                        this.body.angle=-270;
                        this.angle=-270;
                    }
                    else{this.body.angle=270;
                        this.angle=270;
                    }
                    
                    this.pared=true;         

                }
                else{
                    //console.log("ELSE")             //No esta sobre nada
                    if(!this.goDown){
                        if(this.direction.x===1){//se mueve a la derecha
                            this.x-=10;               
                        }
                        else {

                            this.x+=10;
                        }
                        this.changeDirectionX(-this.direction.x)
                        //this.changeDirectionY(-this.direction.y)
                    }
                    //this.changeDirectionY(0)
                }
                this.verticalMove()
                this.horizontalMove();
            }
            
        }
        super.colisionPlayer();    

    }

}

