import Enemy from './Enemy.js';  //esto esta aqui porque funciona
export default class Gezi extends Enemy  {
    
    constructor(scene, x,y, speed, dir, points, damage, lives,group,  sprite){
        super(scene,x,y, speed, dir, points, damage,lives,group, sprite);
        //this.startMove=false;
        //this.noFloorMove=10;//para que cambie de direccion cuando no hay suelo
        //this.changeDirectionX(1);
        
        this.firstTouch=true;
        
        this.pared=false;
        this.startMovY=200;
        this.body.setMaxVelocity(speed,speed);
        this.body.setAllowGravity(false);
        this.goDown=true;
        this.startMove=false;
        // this.goingDown = -1;    //-1 va para arriba, 1 va para abajo
        // this.imOn = "floor";    //para probar estados
        //probar a ponerle gravedad en Y y una velocidad en Y mayoer que la gravedad,
        // tambien cambiar la gravedad maxima para que sea igual a esta velocidad
        //asi siempre detecta  onFloor y si estas subiendo se puede cambiar para que detecte onCeiling
        //this.i=1;
        //this.yoMismo=sprite;
      }
    /*checkPosition(){    //no lo uso
        if(this.body.onFloor()){
            this.imOn = "floor";
        } else if(this.body.onCeiling()){
            this.imOn = "ceiling";
        }else if(this.body.onWall()){
            this.imOn = "wall";
        }else{
            this.imOn = "none";
        }
    }*/
    preUpdate(){
        //esto es que comprueba que no se sale de los limites no?
        if(this.y<=10) this.changeDirectionY(1);
        else if(this.y>=3100) this.changeDirectionY(-1);

         //this.prevY=this.y;
        // console.log("ANtes  "+this.y)
        // console.log("ANtes  "+this.prevY)
          
        // this.prevY=this.y;

        // console.log(this.y)
        // console.log(this.prevY)
        //this.body.setGravityY(-600);
        // switch(this.imOn){
        //     case "floor":{
        //         this.horizontalMove();
        //         this.body.angle=0;
        //         this.angle=0;
        //         if(this.body.onWall()){
        //             this.imOn = "wall";
        //             this.changeDirectionY(this.goingDown);  //o direccion si esta bien puesta
        //             this.body.angle= -90;
        //             this.angle=-90;
        //         }
        //     }
        //     break;
        //     case "wall":{
        //         this.verticalMove();
        //         if(this.body.onCeiling()){
        //             this.imOn = "ceiling";
        //             this.changeDirectionY(- this.direction.x);  //o direccion si esta bien puesta
        //             this.body.angle= 180;
        //             this.angle= 180;
        //         }
        //     }
        //     break;
        //     case "ceiling":{
        //         this.horizontalMove();
        //         if(this.body.onWall()){
        //             this.imOn = "wall";
        //             

        //         }   //comprobar si sigo en el techo, si no, y no choco con nada, tengo que girar, es bastante feo
        //     }
        //     break;
        //     case "none":{

        //     }
        //     break;
        // }
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
                if(this.y-this.scene.player.y<=this.startMovY && (this.x<750 && this.scene.player.getDimValue()===1
                 || this.x>750 && this.scene.player.getDimValue()===-1 )){
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
                    //console.log("hola");
                    //this.techo=false;
                    //this.changeDirectionY(1);

                }
                this.pared=false;

                //this.changeDirectionY(-1);

                
                }
                else if(this.body.onFloor()){//y tiene que ser 1
                    this.body.angle=0;
                    this.angle=0;
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
                    //console.log ("estoy en wall")
                    /*if (this.body.onCeiling()) this.techo=true;
                    else if (this.body.onFloor()){
                        this.suelo=true;
                    }*/ 
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
            
            //console.log(this.suelo+" "+this.techo+" "+this.pared+" ");
        }
        super.colisionPlayer();    

    }

}

