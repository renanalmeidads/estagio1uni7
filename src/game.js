let game;
const gameOptions = {
    main_character_height: 16,
    main_character_width: 16,
    boardSize: {
        rows: 4,
        cols: 4
    }
}
window.onload = function () {
    var gameConfig = {
        width: 480,
        height: 640,
        backgroundColor: 0xecf0f1,
        scene: [bootGame, playGame]
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);
}

function resizeGame() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    } else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    create() {
        console.log("this is my awesome game");
        this.add.image(240, 320, "map_1_background");
        //this.add.sprite(240, 320, "main_character_1_rest_position", 0);

        const config = {
            key: 'main_character_rest_animation',
            frames: this.anims.generateFrameNumbers('main_character_1_rest_position', {
                start: 0,
                end: 2,
                first: 0
            }),
            frameRate: 6,
            repeat: -1
        };

        this.anims.create(config);

        this.add.sprite(240, 320, 'main_character_1_rest_position').play('main_character_rest_animation');
    }
}

class bootGame extends Phaser.Scene {
    constructor() {
        super("BootGame");
    }
    preload() {
        this.load.image("map_1_background", "assets/sprites/map1.png");
        this.load.spritesheet("main_character_1_rest_position", "assets/sprites/main_character_1_rest.png", {
            frameWidth: gameOptions.main_character_width,
            frameHeight: gameOptions.main_character_height
        });
    }
    create() {
        console.log("game is booting...");
        this.scene.start("PlayGame");
    }
}