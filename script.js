class Game {
    constructor(gameWidth, gameHeight, ctx) {
        this.width = gameWidth;
        this.height = gameHeight;
        this.ctx = ctx;
    }
    start() {
        this.mainCharater = new Character("Evaldo", this, document.getElementById("Maykon-right-img"));
        this.gameObjects = [this.mainCharater];  
    }
    draw() {
        this.gameObjects.forEach(object => object.draw());
    }
    update() {
        this.gameObjects.forEach(object => object.update());
    }
}
class Character {
    constructor(name, game, image, cape) {
        this.name = name;
        this.game = game;
        this.image = image;
        this.cape = cape;
        this.position = {x : 100, y : 50};
        this.speed = {x : 0, y : 0};
        this.width = 150;
        this.height = 150;
        this.cape = cape
        this.capeWidth = this.width + 70;
        this.capeHeight = this.height + 70;
        this.capePosition = {x : this.position.x - (this.capeWidth / 2.4), y : (this.position.y + (this.height / 1.3))};

    }
    draw() {
        this.game.ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        this.game.ctx.drawImage(this.cape, this.capePosition.x, this.capePosition.y, this.capeWidth, this.capeHeight);
    }
    update() {

    }
}

let canvas = document.getElementById("canvas");

const SCREEN_WIDTH = canvas.clientWidth;
const SCREEN_HEIGHT = canvas.clientHeight;

let ctx = canvas.getContext("2d");
let game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT, ctx);
game.start();
game.draw();


