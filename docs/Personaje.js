export default class Personaje extends Phaser.GameObjects.Container{
    constructor(scene, x,y, speed, dir, points, lives,sprite){
        super(scene, x, y);   
        this.yoMismo= this.scene.add.sprite(0,0,sprite);
        this.add(this.yoMismo)
        this.setSize(this.yoMismo.width-5,this.yoMismo.height); //ajusta
        //this.add(this.epada)
        scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.lives = lives;//es por si muere poder resetear su posicion / vida
        //this.pos = {x: x, y: y};
        this.direction = dir;
        this.speed = speed;
        this.points = points;
        
    }
    decreaseHealth(){
        this.lives--;
    }
    changeDirectionX(nx){
        
        this.yoMismo.setFlipX(nx === -1); //esto hace lo mismo
        this.direction.x = nx;
        //this.direction.x = nx;
    }
    changeDirectionY(ny){
        this.direction.y = ny;
    }
    stop(){
        this.body.setVelocityX(0);  
        this.changeDirectionX(0);
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