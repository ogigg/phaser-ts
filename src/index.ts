import Phaser from 'phaser';
import config from './config';
import EndScene from './scenes/EndScene';
import GameScene from './scenes/Game';
import Menu from './scenes/Menu';

new Phaser.Game(
  Object.assign(config, {
    scene: [Menu, GameScene, EndScene],
    backgroundColor: '#4488aa',
    physics: { default: 'arcade', arcade: { debug: false } }
  })
);
