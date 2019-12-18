import Enemy from './Enemy.js'; 
//enemigo que se mueve por las paredes
export default class Gezi extends Enemy  {
    
    constructor(scene, x,y, speed, dir, points, damage, lives,group,  sprite, anim){
        super(scene,x,y, speed, dir, points, damage,lives,group, sprite,anim);
        this.pared=false;
        //this.distance=200;
        this.body.setMaxVelocity(speed,speed);
        this.body.setAllowGravity(false);
        this.goDown=true;
       

    }
    //empieza bajando hasta encontrar suelo porque no tiene gravedad(por si lo colocamos mal al crearlo)
    //se mueve por el suelo, techo y pared hasta que encuentra un hueco que da la vuelta( no da vueltas en una plataformas)
    preUpdate(){
        //esto es que comprueba que no se sale del limite superior
        if(this.y<=10) this.changeDirectionY(1);
       
        //empieza bajando hasta encontrar suelo 
        if(this.goDown){
            this.changeDirectionY(1);
            this.changeDirectionX(1);
            this.verticalMove();            
            if (this.body.onFloor()) this.goDown=false;
        }
        else {
           
            //comprobamos si estamos en el techo
            if(this.body.onCeiling()){//y tiene que ser -1
                this.body.angle=180;
                this.angle=180;
                if(this.direction.x===1)   this.yoMismo.setFlipX(true);
                else this.yoMismo.setFlipX(false);
                if(this.body.onWall()){
                    if(!this.pared){//estabas yendo por el techo hasta tocar el muro
                        this.changeDirectionY(1)
                    }
                    else{                            
                        this.changeDirectionX(-this.direction.x);
                    }
                }
                this.pared=false;           
            }
            //comprobamos si estamos en el suelo
            else if(this.body.onFloor()){//y tiene que ser 1
                this.body.angle=0;
                this.angle=0;
                if(this.direction.x===1)   this.yoMismo.setFlipX(false);
                else this.yoMismo.setFlipX(true);
                if(this.body.onWall()){
                    if(this.body.onWall()){
                        if(!this.pared){//estabas yendo por el suelo hasta tocar el muro
                            this.changeDirectionY(-1)
                        }
                        else{                                
                            this.changeDirectionX(-this.direction.x);            
                        }            
                    }

                }
                this.pared=false;
                
            }
            //comprobamos si estamos en una pared
            else if(this.body.onWall() ){//x tiene que ser -1 o 1
                if(this.direction.x===-1){
                    //this.yoMismo.setFlipX(true);
                    this.body.angle=-270;
                    this.angle=-270;
                    if(this.direction.y===-1){
                        this.yoMismo.setFlipX(true);
                        
                    }
                    else{
                        this.yoMismo.setFlipX(false);
                        
                    } 
                }
                else{
                    if(this.direction.y===-1){
                        this.yoMismo.setFlipX(false);
                        
                    }
                    else{
                        this.yoMismo.setFlipX(true);
                        
                    } 
                    //this.yoMismo.setFlipX(false);
                    this.body.angle=270;
                    this.angle=270;
                } 
                                    
                this.pared=true;         

            }
            else{//si esta en el aire le invertimos su direccion         
                if(!this.goDown){
                    if(this.direction.x===1){//se mueve a la derecha
                        this.x-=15;               
                    }
                    else {

                        this.x+=15;
                    }
                    this.changeDirectionX(-this.direction.x)
                }
            }
            this.verticalMove()
            this.horizontalMove();
        }
            
        super.colisionPlayer();    

    }

}

