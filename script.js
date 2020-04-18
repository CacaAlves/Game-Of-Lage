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

        this.CobraSong = document.getElementById("Cobra-Venenosa-audio");

        this.mainCharater = new Character("Evaldo", this, document.getElementById("Evaldo-right-img"), document.getElementById("cape-right"));
        this.gameObjects = [this.mainCharater];
    }
    menu() {
        if (this.menuAnimationOn) {
            this.mainCharater.position.y = this.height - this.mainCharater.capeHeight - this.mainCharater.height + (this.mainCharater.height / 3);
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
                this.CobraSong.pause();

                let text1 = "Carai, eu sou um merda, mermão... Eu moro num ônibus!!!";
                let text2 = "Sou muito pobre... Queria tanto ser o dono da Lage!"
                let text3 = "Quero mudar de vida... Mas não quero entrar pro crime!";
                let text4 = "Já sei! Vou salvar meninas aleatórias..."
                let text4_2 =  "e perguntar se elas querem morar no meu harém!";
                let text5 = "E vou tomar bomba ! HAHAHAHAHHAHA";
                let text6 = "Olá! Sou o Mago C-Abriu!";
                let text7 = "Se queres se tornar o dono da Lage";
                let text8 = "Deves pegar 5 meninas para teu harém";
                let text9 = "E só assim iniciarás teu reinado!";
                let text10 = "Deves começar pelo Redondo! :";
                let text11 = "Com Arthur, o Gado!";
                let font = "30px Arial";
                let color = "black";
                let positionX = this.mainCharater.position.x + 400;
                let positionY = this.mainCharater.position.y - 30;
                if (this.text1Counter < 300) {
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
                    this.runGame();
                }
            }
        }
        else {
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
    runGame() {
        if (this.gameStage == this.GAME_STAGE.MENU) {
            this.gameStage = this.GAME_STAGE.RUNNING;
        }
    }
    drawText(text, font, color ,positionX, positionY) {
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text,positionX, positionY);
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

let stylew = window.getComputedStyle(canvas).width;
let value = parseInt(stylew.substr(0,stylew.search("px")));
canvas.width = value;
let styleh = window.getComputedStyle(canvas).height;
value = parseInt(styleh.substr(0,styleh.search("px")));
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


