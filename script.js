// const FELIPE_LEVEL = [
//     [0, "block-1"],
//     []
// ];
class Game {
    constructor(gameWidth, gameHeight, ctx, GAME_STAGE) {
        this.width = gameWidth;
        this.height = gameHeight;
        this.ctx = ctx;
        this.GAME_STAGE = GAME_STAGE
        this.gameStage = this.GAME_STAGE.MENU;
        this.ih = new InputHandler(this);
    }
    start() {
        this.x = 0;
        this.y = 0;
        this.menuAnimationOn = false;

        this.mago = new Img(this,
            document.getElementById("Rei-left"),
            this.width / 2,
            this.height - 300 - 10,
            250,
            300);

        this.camaro = new Img(this,
            document.getElementById("camaro-img"),
            50, 50, 200, 100);
        this.initionAnimationBeforeMago = true;

        this.cobraSong = document.getElementById("Cobra-Venenosa-audio");
        this.querTomarBombaSong = document.getElementById("Quer-Tomar-Bomba-audio");
        this.narutoSadSong = document.getElementById("Sorrow-And-Sadness-audio");
        this.runningSongPlayin = this.querTomarBombaSong;

        this.mainCharater = new Character("Evaldo",
            this,
            document.getElementById("Evaldo-left-img"),
            document.getElementById("Evaldo-right-img"),
            document.getElementById("cape-left"),
            document.getElementById("cape-right"));

        this.gameObjects = [this.mainCharater];
    }
    menu() {
        if (this.menuAnimationOn) {
            this.mainCharater.position.y = this.height - this.mainCharater.capeHeight - this.mainCharater.height + (this.mainCharater.height / 3);
            this.mainCharater.initialPositionY = this.mainCharater.position.y;
            this.mainCharater.draw();
            let bus = document.getElementById("bus-img");
            this.bus = new Img(this,
                bus,
                (this.mainCharater.position.x + (this.mainCharater.width * 2)),
                (this.height - (this.mainCharater.height * 3)),
                (this.mainCharater.width * 4),
                (this.mainCharater.capeHeight * 2.5)
            );
            if (this.initionAnimationBeforeMago) {
                this.bus.draw();
                this.camaro.draw();
            }
            this.camaro.position.x += 2;
            if (this.camaro.position.x >= this.width) {
                this.cobraSong.pause();
                this.narutoSadSong.play();
                let text0 = "(Aperte space para pular animação)";
                let text1 = "Carai, eu sou um merda, mermão... Eu moro num ônibus!!!";
                let text2 = "Sou muito pobre... Queria tanto ser o dono da Lage!"
                let text3 = "Quero mudar de vida... Mas não quero entrar pro crime!";
                let text4 = "Já sei! Vou salvar várias meninas aleatórias..."
                let text4_2 = "e perguntar se elas querem morar no meu harém!";
                let text5 = "E vou tomar bomba ! HAHAHAHAHHAHA";
                let text6 = "Olá! Sou C-Abriu?!, o Mago.";
                let text7 = "Se queres se tornar o dono da Lage";
                let text8 = "Deves pegar 5 meninas para teu harém";
                let text9 = "E, só assim, iniciarás teu reinado!";
                let text10 = "Deves começar pelo Redondo :";
                let text11 = "com Arthur, o Gado!";
                let font = "30px Arial";
                let color = "black";
                let positionX = this.mainCharater.position.x + 400;
                let positionY = this.mainCharater.position.y - 30;
                if (this.text0Counter < 150) {
                    this.drawText(text0, "20px Arial", color, positionX, positionY);
                    this.text0Counter++;
                } else if (this.text1Counter < 300) {
                    this.drawText(text1, font, color, positionX, positionY);
                    this.text1Counter++;
                    this.bus.draw();
                } else if (this.text2Counter < 300) {
                    this.drawText(text2, font, color, positionX, positionY);
                    this.text2Counter++;
                    this.bus.draw();
                } else if (this.text3Counter < 300) {
                    this.drawText(text3, font, color, positionX, positionY);
                    this.text3Counter++;
                    this.bus.draw();
                } else if (this.text4Counter < 400) {
                    if (this.text4Counter < 200) {
                        this.drawText(text4, font, color, positionX + 100, positionY);
                    }
                    else {
                        this.drawText(text4_2, font, color, positionX + 100, positionY);
                    }
                    this.text4Counter++;
                    this.bus.draw();
                } else if (this.text5Counter < 250) {
                    this.drawText(text5, font, color, positionX, positionY);
                    this.text5Counter++;
                    this.bus.draw();
                } else if (this.text6Counter < 250) {
                    positionY -= 80;
                    this.drawText(text6, font, color, positionX, positionY);
                    this.text6Counter++;
                    this.mago.draw();
                    this.initionAnimationBeforeMago = false;
                } else if (this.text7Counter < 250) {
                    positionY -= 80;
                    this.drawText(text7, font, color, positionX, positionY);
                    this.text7Counter++;
                    this.mago.draw();
                } else if (this.text8Counter < 250) {
                    positionY -= 80;
                    this.drawText(text8, font, color, positionX, positionY);
                    this.text8Counter++;
                    this.mago.draw();
                } else if (this.text9Counter < 250) {
                    positionY -= 80;
                    this.drawText(text9, font, color, positionX, positionY);
                    this.text9Counter++;
                    this.mago.draw();
                } else if (this.text10Counter < 250) {
                    positionY -= 80;
                    this.drawText(text10, font, color, positionX, positionY);
                    this.text10Counter++;
                    this.mago.draw();
                } else if (this.text11Counter < 250) {
                    positionY -= 80;
                    this.drawText(text11, font, color, positionX, positionY);
                    this.text11Counter++;
                    this.mago.draw();
                } else {
                    this.narutoSadSong.pause();
                    this.createBlock();
                    this.runGame();
                }
            }
        }
        else {
            this.text0Counter = 0;
            this.text1Counter = 0;
            this.text2Counter = 0;
            this.text3Counter = 0;
            this.text4Counter = 0;
            this.text5Counter = 0;
            this.text6Counter = 0;
            this.text7Counter = 0;
            this.text8Counter = 0;
            this.text9Counter = 0;
            this.text10Counter = 0;
            this.text11Counter = 0;
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
    createBlock() {
        this.block_1 = new Block(this);
        this.gameObjects.push(this.block_1);
    }
    runGame() {
        if (this.gameStage == this.GAME_STAGE.MENU) {
            this.gameStage = this.GAME_STAGE.RUNNING;
            this.runningSongPlayin.play();
        }
    }
    drawText(text, font, color, positionX, positionY) {
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, positionX, positionY);
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
        if (this.runningSongPlayin.ended) this.runningSongPlayin.play();
    }
}
class Img {
    constructor(game, img, positionX, positionY, width, height) {
        this.game = game;
        this.img = img;
        this.position = { x: positionX, y: positionY };
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
                        if (this.game.menuAnimationOn != true) {
                            this.game.menuAnimationOn = true;
                            this.game.cobraSong.play();
                        } else {
                            this.game.createBlock();
                            this.game.runGame();
                            this.game.cobraSong.pause();
                        }
                    }
                    break;
                case 37:
                case 65:
                    if (this.game.gameStage == this.game.GAME_STAGE.RUNNING) this.game.mainCharater.walkLeft();
                    break;
                case 39:
                case 68:
                    if (this.game.gameStage == this.game.GAME_STAGE.RUNNING) this.game.mainCharater.walkRight();
                    break;
                case 38:
                case 87:
                    if (this.game.gameStage == this.game.GAME_STAGE.RUNNING) this.game.mainCharater.jump();
                    break;
                default:
                    break;
            }
        });
    }
}
class Character {
    constructor(name, game, imageLeft, imageRight, capeLeft, capeRight) {
        this.name = name;
        this.game = game;
        this.imageLeft = imageLeft;
        this.imageRight = imageRight;
        this.capeLeft = capeLeft;
        this.capeRight = capeRight;

        this.image = this.imageRight;
        this.cape = this.capeRight;

        this.position = { x: 100, y: 50 };
        this.speed = { x: 0, y: 0 };
        this.width = 110;
        this.height = 110;
        this.capeWidth = this.width + 70;
        this.capeHeight = this.height + 70;
        this.capePosition = { x: this.position.x - (this.capeWidth / 3), y: (this.position.y + (this.height / 1.3)) };

    }
    draw() {
        this.game.ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        this.game.ctx.drawImage(this.cape, this.capePosition.x, this.capePosition.y, this.capeWidth, this.capeHeight);
    }
    walkLeft() {
        this.image = this.imageLeft;
        this.cape = this.capeLeft;
        if (this.position.x < 0) {
            this.position.x = 0;
        } else {
            this.speed.x = -100;
        }
    }
    walkRight() {
        this.image = this.imageRight;
        this.cape = this.capeRight;
        if (this.position.x + this.width > this.game.width) {
            this.position.x = this.game.width - this.width;
        } else {
            this.speed.x = 100;
        }
    }
    jump() {
        if (this.position.y >= this.initialPositionY - 50) {
            this.speed.y = -25;
        }
    }
    update() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if (this.speed.x > 0) {
            this.lastMove = "right";
        } else if (this.speed.x < 0) {
            this.lastMove = "left";
        } else {
            this.lastMove = "noMove";
        }
        this.speed.x = 0;
        this.speed.y = 0;
        if (this.position.y <= this.initialPositionY) {
            this.speed.y = 1;
        }
        if (this.image == this.imageRight) {
            this.capePosition = { x: this.position.x - (this.capeWidth / 3), y: (this.position.y + (this.height / 1.3)) };
        } else {
            this.capePosition = { x: this.position.x - (this.width / 6), y: (this.position.y + (this.height / 1.3)) };
        }
    }
}
class Block {
    constructor(game) {
        this.game = game;
        this.img = document.getElementById("block");
        
        this.width = 100;
        this.height = 100;

        let positionX = Math.floor(Math.random() * this.game.width - this.width);
        let positionY = this.game.mainCharater.initialPositionY - this.height - 45;
        this.position = { x: positionX, y: positionY };
        this.game.block = this;
        this.game.gameObjects.push(this);
        

    }
    draw() {
        this.game.ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        if (this.game.mainCharater.lastMove == "left") {
            this.position.x += 50;
            console.log("left");
        } else if (this.game.mainCharater.lastMove == "right") {
            this.position.x -= 50;
            console.log("right");
        }
    }
}
let canvas = document.getElementById("canvas");

let stylew = window.getComputedStyle(canvas).width;
let value = parseInt(stylew.substr(0, stylew.search("px")));
canvas.width = value;
let styleh = window.getComputedStyle(canvas).height;
value = parseInt(styleh.substr(0, styleh.search("px")));
canvas.height = value;

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


