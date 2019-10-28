export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, player, platformGroup, x, y, key){
        super(scene, x, y, key);
        this.scene.add.existing(this);
        //this.anchor.setTo(0.5);
        //this.angle = 90; 
        this.scene.physics.add.existing(this,true);        //Añado comportamiento físico
        platformGroup.add(this);
        this.scene.physics.add.collider(this, player);
        //this.setGravityY(0);
        

        //platforms = this.physics.add.staticGroup();

        // platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        // platforms.create(600, 400, 'ground');
        // platforms.create(50, 250, 'ground');
        // platforms.create(750, 220, 'ground');
    }
}