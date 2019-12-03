export default class Personaje extends Phaser.GameObjects.Sprite{
    constructor(scene, x,y, speed, dir, points, lives,sprite){
        super(scene, x, y, sprite);   
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