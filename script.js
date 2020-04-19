const ArthurLevel = {
    m1X: [200, 700, 1600, 1800, 3000],
    m2X: [120, 220, 550, 900],
    blocks: [200, 300, 400, 500, 900, 1500, 5000, 5100, 5200, 5300],
    m1Left: document.getElementById("Loli-left"),
    m1Right: document.getElementById("Loli-right"),
    m2Left: document.getElementById("Felipe-left"),
    m2Right: document.getElementById("Felipe-right")
}
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
        this.runningSongPlaying = this.querTomarBombaSong;

        this.mainCharater = new Character("Evaldo",
            this,
            document.getElementById("Evaldo-left-img"),
            document.getElementById("Evaldo-right-img"),
            document.getElementById("cape-left"),
            document.getElementById("cape-right"),
            document.getElementById("cape-left-rotate"),
            document.getElementById("cape-right-rotate"));

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
                    this.level = new Level(this, ArthurLevel.m1X, ArthurLevel.m2X, ArthurLevel.blocks, ArthurLevel.m1Left,
                        ArthurLevel.m1Right, ArthurLevel.m2Left, ArthurLevel.m2Right);
                    this.gameObjects.push(this.level);
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
    runGame() {
        if (this.gameStage == this.GAME_STAGE.MENU || this.gameStage == this.GAME_STAGE.PAUSED) {
            this.gameStage = this.GAME_STAGE.RUNNING;
            this.runningSongPlaying.play();
        }
    }
    togglePause() {
        if (this.gameStage == this.GAME_STAGE.RUNNING) {
            this.gameStage = this.GAME_STAGE.PAUSED;
        } else if (this.gameStage == this.GAME_STAGE.PAUSED) {
            this.runGame();
        }

    }
    pause() {
        this.runningSongPlaying.pause();

        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        this.ctx.fill();

        this.ctx.font = "50px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Paused", this.width / 2, this.height / 2);

        this.gameObjects.forEach(obj => obj.draw());

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
            case this.GAME_STAGE.PAUSED:
                this.pause();
                break;
            default:
                break;
        }
    }
    update() {
        if (this.gameStage == this.GAME_STAGE.MENU || this.gameStage == this.GAME_STAGE.RUNNING) {
            this.gameObjects.forEach(object => object.update());
            if (this.runningSongPlaying.ended) this.runningSongPlaying.play();
        }
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
class Monster {
    constructor(game, imgLeft, imgRight, positionX, positionY, width, height) {
        this.game = game;
        this.imgLeft = imgLeft;
        this.imgRight = imgRight;
        this.img = this.imgRight;
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
    update() {
        if (this.position.x > this.game.mainCharater.position.x) {
            this.position.x -= Math.floor(Math.random() * 5);
            this.img = this.imgLeft;
        } else if (this.position.x < this.game.mainCharater.position.x) {
            this.position.x += Math.floor(Math.random() * 5);
            this.img = this.imgRight;
        }
    }
}
class Level {
    constructor(game, monsters1XPos, monsters2XPos, blocksX, monster1Left, monster1Right, monster2Left, monster2Right) {
        this.game = game;
        this.monsters1XPos = monsters1XPos.slice();
        this.monsters2XPos = monsters2XPos.slice();
        this.blocksX = blocksX.slice();
        this.monster1Left = monster1Left;
        this.monster1Right = monster1Right;
        this.monster2Left = monster2Left;
        this.monster2Right = monster2Right;

        this.monsters = [];

        this.blocksX.forEach(blockX => this.drawBlocks(blockX));
    }
    draw() {
        if (this.monsters.length != 0) this.monsters.forEach(m => m.draw());
    }
    dropMonster(monsterX, index, array, increment) {
        if (monsterX == this.game.x) {
            let m = new Monster(this.game, this.monster1Left, this.monster1Right, (this.game.mainCharater.position.x + increment),
                (this.game.mainCharater.initialPositionY),
                this.game.mainCharater.capeWidth, (this.game.mainCharater.height + this.game.mainCharater.capeHeight));
            this.monsters.push(m);

            array.splice(index, index + 1);
        }
    }
    drawBlocks(blockX) {
        new Block(this.game, blockX);
    }
    update() {
        this.monsters1XPos.forEach((monster1X, index, array) => this.dropMonster(monster1X, index, array, 1000));
        this.monsters2XPos.forEach((monster2X, index, array) => this.dropMonster(monster2X, index, array, -1000));
        if (this.monsters.length != 0) this.monsters.forEach(m => m.update());
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
                            this.game.level = new Level(this.game, ArthurLevel.m1X, ArthurLevel.m2X, ArthurLevel.blocks,
                                ArthurLevel.m1Left, ArthurLevel.m1Right, ArthurLevel.m2Left,
                                ArthurLevel.m2Right);
                            this.game.gameObjects.push(this.game.level);
                            this.game.runGame();
                            this.game.cobraSong.pause();
                        }
                    }
                    break;
                case 37:
                case 65:
                    this.game.mainCharater.walkLeft();
                    break;
                case 39:
                case 68:
                    this.game.mainCharater.walkRight();
                    break;
                case 38:
                case 87:
                    this.game.mainCharater.jump();
                    break;
                case 80:
                case 27:
                    this.game.togglePause();
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
        this.width = 100;
        this.height = 100;
        this.capeWidth = this.width + 70;
        this.capeHeight = this.height + 70;
        this.capePosition = { x: this.position.x - (this.capeWidth / 3), y: (this.position.y + (this.height / 1.3)) };

    }
    draw() {
        this.game.ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        this.game.ctx.drawImage(this.cape, this.capePosition.x, this.capePosition.y, this.capeWidth, this.capeHeight);
    }
    walkLeft() {
        if (this.game.gameStage == this.game.GAME_STAGE.RUNNING) {
            this.image = this.imageLeft;
            this.cape = this.capeLeft;
            if (this.position.x <= this.game.x - 10) {
                this.position.x = 0;
            } else {
                this.speed.x = -50;
            }
            this.game.x += this.speed.x;
        }
    }
    walkRight() {
        if (this.game.gameStage == this.game.GAME_STAGE.RUNNING) {

            this.image = this.imageRight;
            this.cape = this.capeRight;
            if (this.position.x + this.width >= this.game.width - 200) {
                this.position.x = this.game.width - this.width - 200;
            } else {
                this.speed.x = 50;
            }
        }
        this.game.x += 50;
    }
    jump() {
        if (this.game.gameStage == this.game.GAME_STAGE.RUNNING) {
            if (this.position.y >= this.game.height / 4 - this.height) {
                this.speed.y = -25;
            }
        }
    }
    update() {
        console.log(this.game.x);
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
        
        let isOnABlock = false;
        this.game.gameObjects.forEach(obj => {
            if (obj.className == "Block" && 
            (this.capePosition.y + this.capeHeight < obj.position.y + (obj.height / 5)) &&
            ((this.capePosition.y + this.capeHeight) >= obj.position.y) &&
            (this.position.x >= obj.position.x - 20) &&
            (this.position.x + this.width - 20 <= obj.position.x + obj.width + 20)) {
                isOnABlock = true;
            }
        }); 
        if (this.position.y <= this.initialPositionY && !isOnABlock) {
            this.speed.y = 1;
        } else {
            this.speed.y = 0;
        }
        if (this.image == this.imageRight) {
            this.capePosition = { x: this.position.x - (this.capeWidth / 2.7), y: (this.position.y + (this.height / 1.3)) };
        } else {
            this.capePosition = { x: this.position.x - (this.width / 15), y: (this.position.y + (this.height / 1.3)) };
        }
    }
}
class Block {
    constructor(game, posX) {
        this.game = game;
        this.img = document.getElementById("block");

        this.className = "Block";

        this.width = 100;
        this.height = 100;

        let positionX = posX;
        let positionY = this.game.mainCharater.position.y - this.height;
        this.position = { x: positionX, y: positionY + 50 };
        this.game.block = this;
        this.game.gameObjects.push(this);


    }
    draw() {
        this.game.ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        if (this.game.mainCharater.lastMove == "left") {
            this.position.x += 50;
        } else if (this.game.mainCharater.lastMove == "right") {
            this.position.x -= 50;
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


