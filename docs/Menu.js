import Button from './Button.js';

export default class Menu extends Phaser.Scene {
    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        let clickCount = 0;
        this.clickCountText = scene.add.text(100, 200, '');
        this.incrementButton = new Button(this.scene, 100, 100, 'Increment Count', { fill: '#0f0'}, () => this.incrementClickCount());
        // this.Increment = scene.add.text(100, 100, 'Increment!', { fill: '#0f0' });
        // this.Increment.setInteractive();
        // this.Increment.on('pointerdown', () => this.updateClickCountText(++clickCount) );
        // this.Increment.on('pointerover', () => this.enterButtonHoverState() );
        // this.Increment.on('pointerout', () => this.enterButtonRestState() );
        this.decrementButton = new Button(this.scene, 100, 150, 'Decrement Count', { fill: '#0f0'}, () => this.decrementClickCount());

        // this.Decrement = scene.add.text(100, 150, 'Decrement!', { fill: '#0f0' });
        // this.Decrement.setInteractive();
        // this.Decrement.on('pointerdown', () => this.updateClickCountText(--clickCount) );
        // this.Decrement.on('pointerover', () => this.enterButtonHoverState() );
        // this.Decrement.on('pointerout', () => this.enterButtonRestState() );
    
        this.updateClickCountText(clickCount);
      }
    
      updateClickCountText(clickCount) {
        this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
      }
    
      enterButtonHoverState() {
        this.Increment.setStyle({ fill: '#ff0'});
      }
    
      enterButtonRestState() {
        this.Increment.setStyle({ fill: '#0f0' });
      }
    }