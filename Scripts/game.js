var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var player;
var platforms;

function preload() {

    game.load.image('land', 'images/land.png');
    game.load.spritesheet('pizza', 'images/pizza.png', 35, 30);

}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 35, 'land');
    ground.body.immovable = true;

    player = game.add.sprite(game.world.width - 35, game.world.height - 70, 'pizza');
    player.scale.setTo(1, 1);
    player.enableBody = true;
    game.physics.arcade.enable(player);

    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {


    game.physics.arcade.collide(player, platforms);


    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -350;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 350;
        player.animations.play('right');
    }
    else{
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -300;
    }


    //Check overlap:
    //game.physics.arcade.overlap(player, items, collectItem, null, this);


}


//function collectItem (player, item) {
    //  item.kill();
//}
