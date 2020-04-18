class Game {
    constructor(gameWidth, gameHeight, ctx, GAME_STAGE) {
        this.width = gameWidth;
        this.height = gameHeight;
        this.ctx = ctx;
        this.GAME_STAGE = GAME_STAGE
        this.gameStage = this.GAME_STAGE.MENU;
        this.ih = new InputHandler(this);
    }
    test() {
        console.log("a");
    }
    start() {
        this.menuAnimationOn = false;
        this.camaro = new Car(this, 
            document.getElementById("camaro-img"),
            50, 50, 200, 100);
        this.CobraSong = document.getElementById("Cobra-Venenosa-audio");
        this.mainCharater = new Character("Evaldo", this, document.getElementById("Evaldo-right-img"), document.getElementById("cape-right"));
        this.gameObjects = [this.mainCharater];
    }
    menu() {
        if (this.menuAnimationOn) {
            this.mainCharater.position.y = this.height - this.mainCharater.capeHeight - this.mainCharater.height + (this.mainCharater.height / 3);
            this.mainCharater.draw();
            let bus = document.getElementById("bus-img");
            this.ctx.drawImage(bus,
                              (this.mainCharater.position.x + (this.mainCharater.width * 2)),
                              (this.height - (this.mainCharater.height * 3)), 
                              (this.mainCharater.width * 4),
                              (this.mainCharater.capeHeight * 2.5)
                              );
            this.camaro.draw();
            this.camaro.position.x += 2;
            if (this.camaro.position.x >= this.width ) {
                this.runGame();
                this.CobraSong.pause();
            }
        }
        else {

            this.ctx.rect(0, 0, this.width, this.height);
            this.ctx.fillStyle = "rgb(0,0,0)";
            this.ctx.fill();
            
            this.ctx.font = "50px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.ctx.fillText("Press space to start the game", this.width / 2, this.height / 2);
            
            this.mainCharater.draw();
        }
    }
    runGame() {
        if (this.gameStage == this.GAME_STAGE.MENU) {
            this.gameStage = this.GAME_STAGE.RUNNING;
        }
    }
    draw() {
        switch (this.gameStage) {
            case this.GAME_STAGE.MENU:
                this.menu();
                break;
            case this.GAME_STAGE.RUNNING:
                this.gameObjects.forEach(obj => obj.draw());
                break;
            default:
                break;
        }
    }
    update() {
        this.gameObjects.forEach(object => object.update());
    }
}
class Car {
    constructor(game, img, positionX, positionY, width, height, ) {
        this.game = game;
        this.img = img;
        this.position = {x : positionX, y : positionY};
        this.width = width;
        this.height = height;
    }
    draw() {
        this.game.ctx.drawImage(this.img,
            (this.position.x),
            (this.position.y), 
            (this.width),
            (this.height)
            );
    }
}
class InputHandler {
    constructor(game) {
        this.game = game;
        document.addEventListener("keydown", event => {
            switch (event.keyCode) {
                case 32:
                    if (this.game.gameStage == this.game.GAME_STAGE.MENU) {
                       this.game.menuAnimationOn = true;
                       this.game.CobraSong.play();
                    }
                    break;

                default:
                    break;
            }
        });
    }
}
class Character {
    constructor(name, game, image, cape) {
        this.name = name;
        this.game = game;
        this.image = image;
        this.cape = cape;
        this.position = { x: 100, y: 50 };
        this.speed = { x: 0, y: 0 };
        this.width = 110;
        this.height = 110;
        this.cape = cape
        this.capeWidth = this.width + 70;
        this.capeHeight = this.height + 70;
        this.capePosition = { x: this.position.x - (this.capeWidth / 2.4), y: (this.position.y + (this.height / 1.3)) };

    }
    draw() {
        this.game.ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        this.game.ctx.drawImage(this.cape, this.capePosition.x, this.capePosition.y, this.capeWidth, this.capeHeight);
    }
    update() {
        this.capePosition = { x: this.position.x - (this.capeWidth / 2.4), y: (this.position.y + (this.height / 1.3)) };
    }
}

let canvas = document.getElementById("canvas");

const SCREEN_WIDTH = canvas.clientWidth;
const SCREEN_HEIGHT = canvas.clientHeight;

GAME_STAGE = { MENU: 0, RUNNING: 1, PAUSED: 2, GAMEOVER: 3 };

let ctx = canvas.getContext("2d");

let game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT, ctx, GAME_STAGE);
game.start();

function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    game.draw();
    game.update();
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);


