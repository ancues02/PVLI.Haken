import Enemy from './Enemy.js';  //esto esta aqui porque funciona
export default class Reizen extends Enemy  {
    constructor(scene, x,y, speed, dir, points, damage, lives,  sprite){
        super(scene,x,y, speed, dir, points, damage,lives, sprite);
        this.startMove=false;
        this.noFloorMove=10;//para que cambie de direccion cuando no hay suelo
        this.changeDirectionX(1);
        this.firstTouchCeiling=true;
        this.firstTouchWall=true;
        this.firstTouchFloor=true;
        this.firstTouch=true;
        this.body.setAllowGravity(false);
        this.goDown=true;
        //probar a ponerle gravedad en Y y una velocidad en Y mayoer que la gravedad,
        // tambien cambiar la gravedad maxima para que sea igual a esta velocidad
        //asi siempre detecta  onFloor y si estas subiendo se puede cambiar para que detecte onCeiling
        this.i=1;
        //this.yoMismo=sprite;
      }

    preUpdate(){
        //this.body.setGravityY(-600);
        if(this.goDown){
            //this.body.setAllowGravity(true);
            this.changeDirectionY(1);
            this.verticalMove();//lo movemos
            
            if (this.body.onFloor()) this.goDown=false;
        }
        //this.horizontalMove();//lo movemos
        //para cambiar de direccion si no hay suelo o encuentra un muro
        if(this.direction.x===1) {
            if(this.direction.y===1) {
                this.body.angle=0;
                this.angle=0;
            }
            else if(this.direction.y===-1) {
                this.body.angle=-90;
                this.angle=-90;
            }
        }
        else if(this.direction.x===-1) {
            if(this.direction.y===1) {
                this.body.angle=-270;
                this.angle=-270;
            }
            else if(this.direction.y===-1) {
                this.body.angle=-180;
                this.angle=-180;
            }
        }
        if(this.body.onWall() ){
            console.log("pared");
            //this.firstTouch=false;

            if(this.firstTouchWall){
                //this.y-=100
                this.firstTouchCeiling=true;
                this.firstTouchWall=false;
                this.firstTouchFloor=true;
                if(! this.firstTouch){ 
                    //console.log("HOLAAAA");     
                  //  this.body.angle-=90;
                   // this.angle-=90;
                }
                else   this.firstTouch=false;
                
                //this.firstTouchWall=false;
                this.changeDirectionY(this.direction.y*-1);
                //this.changeDirectionX(0);
                //this.changeDirectionX(0);

            }
            
            this.verticalMove()
            this.horizontalMove();
            if(this.body.onCeiling() || this.body.onFloor() ){
                if (this.i===1){
                    this.i++;
                }
                else {
                    this.changeDirectionX(0);                console.log("ENTRO");//

                }
            }

        }
        else if(this.body.onCeiling()){
            this.i=1;
            console.log("techo");
            if(this.firstTouchCeiling){
                this.firstTouchCeiling=false;
                this.firstTouchWall=true;
                this.firstTouchFloor=true;
                if(! this.firstTouch){
                    //console.log("HOLAAAA");     

                   // this.body.angle-=90;
                    //this.angle-=90;
                }
                else   this.firstTouch=false;
                //this.changeDirectionY(0);
                this.changeDirectionX(-1);

            }
           // if(this.body.onWall()) this.changeDirectionY(0);
            //this.changeDirectionY(-1);
            this.verticalMove()
            this.horizontalMove();
        }
        else if(this.body.onFloor()){
            this.i=1;
            console.log("suelo");
            if(this.firstTouchFloor){
                this.firstTouchCeiling=true;
                this.firstTouchWall=true;
                this.firstTouchFloor=false;
                if(! this.firstTouch){
                    //console.log("HOLAAAA");     

                    //this.body.angle-=90;
                   // this.angle-=90;
                }
                else   this.firstTouch=false;

                //this.changeDirectionY(-1);
                //this.changeDirectionX(0);
                this.changeDirectionX(1);
                //this.changeDirectionY(0);

            }
            //if(this.body.onWall()) this.changeDirectionY(0);
            this.verticalMove()
            this.horizontalMove();
        }
        else{
            console.log("HOLA");
            if(!this.firstTouchCeiling){//estaba andando por el techo

                //this.body.angle-=90;
               // this.angle-=90;
            }
            else if(!this.firstTouchWall){//estaba andando por la pared

            }
            else if(!this.firstTouchFloor){//estaba andando por el suelo

            }
            
            //this.changeDirectionX(-1);
            //this.changeDirectionY(0);


        }
        console.log("direcion: "+this.direction.x+"   "+this.direction.y)
        //this.x-=this.noFloorMove;
        //this.changeDirectionX(-1);
        
        /*else{
            this.x+=this.noFloorMove;
        }
        if(this.body.onFloor()===false || this.body.onWall()===true) {
            if(this.direction.x===1){
                this.x-=this.noFloorMove;
                this.changeDirectionX(-1);
            }
            else{
                this.x+=this.noFloorMove;
                this.changeDirectionX(1);
            }
        }*/
        super.colisionPlayer();    

    }
}