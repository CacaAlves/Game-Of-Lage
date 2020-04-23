let canvas = document.getElementById("canvas");

let stylew = window.getComputedStyle(canvas).width;
let value = parseInt(stylew.substr(0, stylew.search("px")));
canvas.width = value;
let styleh = window.getComputedStyle(canvas).height;
value = parseInt(styleh.substr(0, styleh.search("px")));
canvas.height = value;

let ctx = canvas.getContext("2d");

const SCREEN_WIDTH = canvas.clientWidth;
const SCREEN_HEIGHT = canvas.clientHeight;
let danielLevel = {
    soundtrack: document.getElementById("Quer-Tomar-Bomba-audio"),
    m1X: [200, 2000, 4000, 6000],
    m2X: [300, 600, 700, 5000, 8800],
    blocks: [200, 300, 400, 500, 900, 1500, 2000, 2100, 2200, 2500, 3400, 3500,
        3600, 3700, 4000, 4500, 4600, 5000, 5100, 5200, 5300,
        6000, 6100, 6300, 7000, 7100, 7200, 7400, 7500, 8900],
    m1Left: document.getElementById("Loli-Cel-left"),
    m1Right: document.getElementById("Loli-Cel-right"),
    m2Left: document.getElementById("Tubarao-left"),
    m2Right: document.getElementById("Tubarao-right"),
    aside: document.getElementById("telefone"),
    measures: [],
    boss: {
        imgLeft: document.getElementById("Daniel-left"),
        imgRight: document.getElementById("Daniel-right"),
        width: 150,
        height: 250,
        posX: SCREEN_WIDTH / 2,
        posY: SCREEN_HEIGHT - 250
    }
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
        this.initionAnimationBeforeMago = true;

        this.mago = new Img(this,
            document.getElementById("Rei-left"),
            this.width / 2,
            this.height - 400,
            250,
            400);

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
        danielLevel.measures.push(this.mainCharater.capeWidth + 50);//m1 2
        danielLevel.measures.push((this.mainCharater.height + this.mainCharater.capeHeight)); //m1 h
        danielLevel.measures.push((this.mainCharater.capeWidth * 3));//m2 w
        danielLevel.measures.push((this.mainCharater.height + this.mainCharater.capeHeight));// m2 h
        danielLevel.measures.push(300);//telephone x 
        danielLevel.measures.push(0)///telephone y
        danielLevel.measures.push(3100);//telephone x2
        danielLevel.measures.push(this.height / 2)///telephone y2
        danielLevel.measures.push(this.mainCharater.width + 50);//telephone w
        danielLevel.measures.push(this.height / 3 + 50);//telephone h

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
            this.bus.draw();
            this.mago.position.x = this.width - this.mago.width - 10;
            this.mago.draw();
            let text0 = "(Aperte space para pular animação)";
            let text1 = "Olá! Sou eu, novamente.";
            let text2 = "Conseguistes roubar a menina do Arthur";
            let text3 = "Todavia, ainda faltam 2!";
            let text4 = "E, só assim, iniciarás teu reinado!";
            let text5 = "Deves ir ao GLORIOSO Bairro Novo:";
            let text6 = "enfrentarás Daniel, o Tubarão";
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
            } else if (this.text2Counter < 300) {
                this.drawText(text2, font, color, positionX, positionY);
                this.text2Counter++;
            } else if (this.text3Counter < 300) {
                this.drawText(text3, font, color, positionX, positionY);
                this.text3Counter++;
            } else if (this.text4Counter < 400) {
                this.drawText(text4, font, color, positionX + 100, positionY);
                this.text4Counter++;
            } else if (this.text5Counter < 250) {
                this.drawText(text5, font, color, positionX, positionY);
                this.text5Counter++;
            } else if (this.text6Counter < 250) {
                positionY -= 80;
                this.drawText(text6, font, color, positionX, positionY);
                this.text6Counter++;
            } else {
                this.level = new Level(this, danielLevel);
                this.gameObjects.push(this.level);
                this.runGame();
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

            this.ctx.fillStyle = "white";
            this.ctx.rect(0, 0, this.width, this.height);
            this.ctx.fill();

            this.ctx.font = "50px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.textAlign = "center";
            this.ctx.fillText("Level 2 - Press space", this.width / 2, this.height / 2);

            this.mainCharater.draw();
        }
    }
    runGame() {
        if (this.gameStage == this.GAME_STAGE.MENU || this.gameStage == this.GAME_STAGE.PAUSED ||
            this.gameStage == this.GAME_STAGE.EVALDOFINALANIMATION) {
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
        this.ctx.fillText("Paused", this.width / 2, this.height / 2 - 100);

        this.gameObjects.forEach(obj => obj.draw());

    }
    gameOver() {
        this.runningSongPlaying.pause();

        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.fillStyle = "rgb(0, 0, 0)";
        this.ctx.fill();

        this.ctx.font = "50px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        if (this.level.level == danielLevel) {
            this.ctx.fillText("Conversa é entre gente, cachorro fica na corrente!", this.width / 2, this.height / 2);
        } else if (this.level.level == danieLevel) {
            this.ctx.fillText("Conversa é entre dois, macaco fica pra depois!", this.width / 2, this.height / 2);
        } else if (this.level.level == joseLevel) {
            this.ctx.fillText("Evaldo NÃO é bolo doido.", this.width / 2, this.height / 2);
        } else {
            this.ctx.fillText("Não estou vendo nenhum bolo, no momento!", this.width / 2, this.height / 2);
        }
        this.ctx.font = "30px Arial";
        this.ctx.fillText("(aperte space para reiniciar)", this.width / 2, this.height / 2 + 100);
    }
    drawText(text, font, color, positionX, positionY) {
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, positionX, positionY);
    }
    releasePower() {
        this.gameObjects.push(new Power(this, 10,
            this.mainCharater.position.x, 1, 360, false));
        this.gameObjects[this.gameObjects.length - 1].setColor("red");
    }
    draw() {
        switch (this.gameStage) {
            case this.GAME_STAGE.MENU:
                this.menu();
                break;
            case this.GAME_STAGE.RUNNING:
                this.gameObjects.forEach(obj => obj.draw());
                break;
            case this.GAME_STAGE.EVALDOFINALANIMATION:
                this.level.evaldoFinalAnimation();
                break;
            case this.GAME_STAGE.PAUSED:
                this.pause();
                break;
            case this.GAME_STAGE.GAMEOVER:
                this.gameOver();
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
class Power {
    constructor(game, radius, startAngle, endAngle, anticlockwise) {
        this.game = game;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.anticlockwise = anticlockwise;
        this.width = this.radius * 2;
        this.height = this.radius * 2;
        this.speedX = 0;
        this.timeOfColision = 0;
        this.color = "blue";
        this.position = { x: this.game.mainCharater.position.x, y:this.game.mainCharater.position.y};
        if (this.game.mainCharater == "left") {
            this.speedX = -5;
        } else {
            this.speedX = 5;
        }
    }
    destruction() {
        this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
    }
    setColor(color) {
        this.color = color;
    }
    leftColision() {
        let c = this.game.level.boss;
        let cRight = c.position.x + c.width;
        let cTop = c.position.y;
        let cBottom = c.position.y + c.height;
        let thisMiddleY = (this.position.y + (this.height / 3.5));
        let thisLeft = this.position.x;
        let thisRight = this.position.x + this.width;
        return (cRight >= thisLeft && cRight <= thisRight &&
            thisMiddleY <= cBottom && thisMiddleY >= cTop);

    }
    rightColision() {
        let c = this.game.level.boss;
        let cLeft = c.position.x;
        let cTop = c.position.y;
        let cBottom = c.position.y + c.height;
        let thisMiddleY = (this.position.y + (this.height / 3.5));
        let thisLeft = this.position.x + this.width;
        let thisRight = this.position.x + this.width;
        return (cLeft >= thisLeft && cLeft <= thisRight &&
            thisMiddleY <= cBottom && thisMiddleY >= cTop);
    }
    draw() {
        if ((this.position.x >= -this.width && this.position.x + this.width <= this.game.width)) {
            this.game.ctx.beginPath();
            this.game.ctx.arc(this.position.x, this.position.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
            this.game.ctx.fillStyle = this.color;
            this.game.ctx.fill();
            console.log("dew");
        }
    }
    update() {
        if (this.leftColision() || this.rightColision()) {
            if (this.timeOfColision == 2) {
                this.game.level.boss.lifeBar.losePoints();
                this.timeOfColision = 0;
            } else {
                this.timeOfColision++;
            }
        } else {
            this.timeOfColision = 0;
        }
        this.position.x += this.speedX;
    }
}
class LifeBar {
    constructor(game) {
        this.game = game;
        this.points = 10;
        this.maxPoints = 100;
        this.position = { x: this.game.width - 310, y: 10 };
        this.width = 300;
        this.height = 30;
        this.losePointsQuantity = 5;
        this.gainPointsQuantity = 10;
        this.color = "green";
    }
    setPositionY(y) {
        this.position.y = y;
    }
    setColor(color) {
        this.color = color;
    }
    setPoints(points) {
        this.points = points;
    } 
    draw() {
        this.game.ctx.rect(this.position.x, this.position.y, this.width, this.height);
        this.game.ctx.stroke();
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(this.position.x + 1, this.position.y + 1,
            this.width * (this.points / 100) - 2, this.height - 2);

    }
    update() {
        if (this.points > this.maxPoints) this.points = this.maxPoints;

        if (this.points < 0) this.points = 0;

        if (this.game.level.lifeBar == this && this.points == 0)
            this.game.gameStage = this.game.GAME_STAGE.GAMEOVER;
    }
    gainPoints() {
        this.game.level.lifeBar.points += this.gainPointsQuantity;
    }
    losePoints() {
        this.points -= this.losePointsQuantity;
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
        if (this.position.x >= -this.width && this.position.x + this.width <= this.game.width)
            this.game.ctx.drawImage(this.img,
                (this.position.x),
                (this.position.y),
                (this.width),
                (this.height)
            );
    }
    update() { }
}
class Monster {
    constructor(game, imgLeft, imgRight, positionX, positionY, width, height, follow) {
        this.game = game;
        this.imgLeft = imgLeft;
        this.imgRight = imgRight;
        this.img = this.imgRight;
        this.position = { x: positionX, y: positionY };
        this.initialPositionY = this.position.y;
        this.width = width;
        this.height = height;
        this.follow = follow;
        this.lastMove = ["left", 0];
        this.timeSpeed = 100;
        this.speedX = 10;
    }
    draw() {
        if (this.position.x >= -this.width && this.position.x + this.width <= this.game.width)
            this.game.ctx.drawImage(this.img,
                (this.position.x),
                (this.position.y),
                (this.width),
                (this.height)
            );
    }
    detectedColision(level) {
        if (leftColision(this.game.mainCharater, this) || rightColision(this.game.mainCharater, this)) {
            this.game.gameStage = this.game.GAME_STAGE.GAMEOVER;
        } else if (bottomColision(this.game.mainCharater, this)) {
            level.monsters.splice(level.monsters.indexOf(this), 1);
            this.game.level.lifeBar.gainPoints();
        }
    }

    update() {
        if (this.lastMove[1] == this.timeSpeed) {
            this.lastMove[1] = 0;
            if (this.lastMove[0] == "left") {
                this.lastMove[0] = "right";
            } else {
                this.lastMove[0] = "left";
            }
        }
        else if (this.lastMove[0] == "left" && this.lastMove[1] < this.timeSpeed) {
            this.position.x += this.speedX;
            if (this.img != this.imgRight) this.img = this.imgRight;
            this.lastMove[1]++;
        } else if (this.lastMove[0] == "right" && this.lastMove[1] < this.timeSpeed) {
            this.position.x -= this.speedX;
            if (this.img != this.imgLeft) this.img = this.imgLeft;
            this.lastMove[1]++;
        }
        if (this.game.mainCharater.lastMove == "left") {
            this.position.x += this.speedX;
        } else if (this.game.mainCharater.lastMove == "right") {
            this.position.x -= this.speedX;
        }
    }
}
class Ball {
    constructor(game, posX, radius, startAngle, endAngle, anticlockwise) {
        this.game = game;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.anticlockwise = anticlockwise;
        this.width = this.radius * 2;
        this.height = this.radius * 2;
        this.speedX = 0;
        this.timeOfColision = 0;
        this.color = "blue";
        this.position = { x: posX, y: Math.floor(Math.random() * (this.game.height - this.height)) };
        if (this.game.level.boss.lastMove[0] == "left") {
            this.speedX = -5;
        } else {
            this.speedX = 5;
        }
    }
    setColor(color) {
        this.color = color;
    }
    leftColision() {
        let c = this.game.mainCharater;
        let cRight = c.capePosition.x + c.capeWidth;
        let cTop = c.position.y;
        let cBottom = c.capePosition.y + c.capeHeight;
        let thisMiddleY = (this.position.y + (this.height / 3.5));
        let thisLeft = this.position.x;
        let thisRight = this.position.x + this.width;
        return (cRight >= thisLeft && cRight <= thisRight &&
            thisMiddleY <= cBottom && thisMiddleY >= cTop);

    }
    rightColision() {
        let c = this.game.mainCharater;
        let cLeft = c.capePosition.x;
        let cTop = c.position.y;
        let cBottom = c.capePosition.y + c.capeHeight;
        let thisMiddleY = (this.position.y + (this.height / 3.5));
        let thisLeft = this.position.x + this.width;
        let thisRight = this.position.x + this.width;
        return (cLeft >= thisLeft && cLeft <= thisRight &&
            thisMiddleY <= cBottom && thisMiddleY >= cTop);
    }
    draw() {
        if ((this.position.x >= -this.width && this.position.x + this.width <= this.game.width)) {
            this.game.ctx.beginPath();
            this.game.ctx.arc(this.position.x, this.position.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
            this.game.ctx.fillStyle = this.color;
            this.game.ctx.fill();
        }

    }
    update() {
        if (this.leftColision() || this.rightColision()) {
            if (this.timeOfColision == 2) {
                this.game.level.lifeBar.losePoints();
                this.timeOfColision = 0;
            } else {
                this.timeOfColision++;
            }
        } else {
            this.timeOfColision = 0;
        }
        this.position.x += this.speedX;
    }
}
class Boss extends Monster {
    constructor(game, imgLeft, imgRight, positionX, positionY, width, height) {
        super(game, imgLeft, imgRight, positionX, positionY, width, height);
        this.timeSpeed = 200;
        this.speedX = 5;
        this.timeToShoot = 0;
        this.timeToChangeY = 0;
        this.balls = [];

        this.lifeBar = new LifeBar(this.game);
        this.lifeBar.setPositionY(this.game.level.lifeBar.position.y +
            this.game.level.lifeBar.height + 10);
        this.lifeBar.setColor("red");
        this.lifeBar.setPoints(100);
        this.lifeBar.losePointsQuantity = 1;
    }
    shoot() {
        this.balls.push(new Ball(this.game, this.position.x + 300, 20, 1, 360, false));
        this.balls.push(new Ball(this.game, this.position.x - 300, 20, 1, 360, false));
        this.balls.push(new Ball(this.game, this.position.x, 20, 1, 360, false));
    }
    draw() {
        super.draw();
        if (this.balls.length != 0) this.balls.forEach(b => b.draw());
        this.lifeBar.draw();
    }
    changeY() {
        this.position.y = Math.floor(Math.random() * (this.game.height - this.height));
    }
    update() {
        super.update();

        if (this.timeToShoot == 200) {
            this.timeToShoot = 0;
            this.shoot();
        } else {
            this.timeToShoot++;
        }

        if (this.timeToChangeY == 400) {
            this.timeToChangeY = 0;
            this.changeY();
        } else {
            this.timeToChangeY++;
        }
        if (this.balls.length != 0) this.balls.forEach(b => b.update());
        this.lifeBar.update();
    }
}
class Telephone extends Monster {
    constructor(game, imgLeft, imgRight, positionX, positionY, width, height, follow) {
        super(game, imgLeft, imgRight, positionX, positionY, width, height, follow);
        this.speedY = 1;
        this.className = "Telephone";
        this.direction = "down";
        console.log(this.position.x, this.position.y)
    }
    draw() {
        if (this.position.x >= -this.width && this.position.x + this.width <= this.game.width)
        this.game.ctx.drawImage(this.img,
            (this.position.x),
            (this.position.y),
            (this.width),
            (this.height)
        );
    }
    update() {
        if (this.game.mainCharater.lastMove == "left") {
            this.position.x += this.speedX;
        } else if (this.game.mainCharater.lastMove == "right") {
            this.position.x -= this.speedX;
        }
        if (this.game.mainCharater.lastMove == "left") {
            this.position.x += this.speedX;
        } else if (this.game.mainCharater.lastMove == "right") {
            this.position.x -= this.speedX;
        }
        if (this.direction == "down") {
            this.position.y += this.speedY;
            if (this.position.y + this.height > this.game.height)
                this.position.y = this.game.height - this.height;
            if (this.position.y + this.height >= this.game.height)
                this.direction = "up";
        } else {
            this.position.y -= this.speedY;
            if (this.position.y < 0)
            this.position.y = 0;
            if (this.position.y == 0) 
            this.direction = "down";
                
        }
        if (leftColision(this.game.mainCharater, this) ||
            rightColision(this.game.mainCharater, this))
        this.game.gameStage = this.game.GAME_STAGE.GAMEOVER;
    }
}
class Level {
    constructor(game, level) {
        this.game = game;
        this.level = level;
        this.monsters1XPos = level.m1X.slice();
        this.monsters2XPos = level.m2X.slice();
        this.blocksX = level.blocks.slice();
        this.monster1Left = level.m1Left;
        this.monster1Right = level.m1Right;
        this.monster2Left = level.m2Left;
        this.monster2Right = level.m2Right;
        this.measures = level.measures;
        this.aside = level.aside;

        this.timeCounter = 0;
        this.finalAnimationTime = 0;
        this.dropMonsterCounter = 2;
        this.finalAnimationDone = false;

        this.game.runningSongPlaying = level.soundtrack;

        this.monsters = [];
        this.objs = [];
        this.blocks = [];
        this.boss = null;

        this.blocksX.forEach(blockX => this.createBlocks(blockX));
        this.createAside();

        this.lifeBar = new LifeBar(this.game);
        this.objs.push(this.lifeBar);

    }
    draw() {
        if (this.monsters.length != 0) this.monsters.forEach(m => m.draw());
        if (this.objs.length != 0) this.objs.forEach(obj => obj.draw());
        if (this.blocks.length != 0) this.blocks.forEach(b => b.draw());
        if (this.boss != null) this.boss.draw();
    }
    dropMonster(monsterX, imgLeft, imgRight, index, array, increment, width, height) {
        let follow = (this.dropMonsterCounter % 2 == 0);
        if (monsterX == this.game.x) {
            this.dropMonsterCounter++;
            let m = new Monster(this.game, imgLeft, imgRight, (this.game.mainCharater.position.x + increment),
                this.game.mainCharater.initialPositionY, width, height, follow);
            this.monsters.push(m);

            array.splice(index, 1);
        }
    }
    createAside() {
        if (this.aside == document.getElementById("telefone")) {
            this.objs.push(new Telephone(this.game, danielLevel.aside, danielLevel.aside,
                danielLevel.measures[4], danielLevel.measures[5], danielLevel.measures[8],
                danielLevel.measures[9], false));
            this.objs.push(new Telephone(this.game, danielLevel.aside, danielLevel.aside,
                danielLevel.measures[6], danielLevel.measures[7], danielLevel.measures[8],
                danielLevel.measures[9], false));
        }
    }
    createBlocks(blockX) {
        this.blocks.push(new Block(this.game, blockX, this.game.mainCharater.position.y - 10));
    }
    evaldoFinalAnimation() {
        this.game.mago.draw();
        this.game.mainCharater.position.y = this.game.height - this.game.mainCharater.height - this.game.mainCharater.capeHeight;
        this.game.mainCharater.update();
        this.game.mainCharater.draw();
        let font = "30px Arial";
        let color = "black";
        let positionX = this.game.mago.position.x - 100;
        let positionY = this.game.mago.position.y - 30;
        let text0 = "Chegastes ao boss dessa fase!";
        let text1 = "Para derrotá-lo, terás que te tomar um decumento";
        let text2 = "Você não tá puro,";
        let text3 = "daqui um mês já tá bombando";
        let text4 = "Ganharás um novo poder!";
        let text5 = "Aperte 'q' para liberá-lo!";
        let text6 = "Sê tu forte e corajoso!";
        let text7 = "Boa sorte!";
        if (this.finalAnimationTime < 200) {
            this.game.drawText(text0, font, color, positionX, positionY);
        } else if (this.finalAnimationTime < 400 && this.finalAnimationTime >= 200) {
            this.game.drawText(text1, font, color, positionX, positionY);
        } else if (this.finalAnimationTime < 600 && this.finalAnimationTime >= 400) {
            this.game.drawText(text2, font, color, positionX, positionY);
        } else if (this.finalAnimationTime < 800 && this.finalAnimationTime >= 600) {
            this.game.drawText(text3, font, color, positionX, positionY);
        } else if (this.finalAnimationTime < 1000 && this.finalAnimationTime >= 800) {
            this.game.drawText(text4, font, color, positionX, positionY);
        } else if (this.finalAnimationTime < 1200 && this.finalAnimationTime >= 1000) {
            this.game.drawText(text5, font, color, positionX, positionY);
        } else if (this.finalAnimationTime < 1400 && this.finalAnimationTime >= 1200) {
            this.game.drawText(text6, font, color, positionX, positionY);
        } else if (this.finalAnimationTime < 1600 && this.finalAnimationTime >= 1400) {
            this.game.drawText(text7, font, color, positionX, positionY);
        } else {
            this.finalAnimationTime = -2;
            this.monsters = [];
            this.game.runGame();
            this.boss = new Boss(this.game, danielLevel.boss.imgLeft,
                danielLevel.boss.imgRight, danielLevel.boss.posX, danielLevel.boss.posY,
                danielLevel.boss.width, danielLevel.boss.height);
            this.finalAnimationDone = true;
        }
        this.finalAnimationTime++;
    }
    skipFinalAnimation() {
        this.finalAnimationTime = 1600;
    }
    update() {
        let increment = 500;
        this.monsters1XPos.forEach((monster1X, index, array) => this.dropMonster(monster1X, this.monster1Left, this.monster1Right, index, array, increment, this.measures[0], this.measures[1]));
        this.monsters2XPos.forEach((monster2X, index, array) => this.dropMonster(monster2X, this.monster2Left, this.monster2Right, index, array, -increment, this.measures[2], this.measures[3]));
        if (this.monsters.length != 0) this.monsters.forEach(m => m.update());
        if (this.monsters.length != 0) this.monsters.forEach(m => m.detectedColision(this));
        if (this.boss != null) this.boss.detectedColision(this);

        (this.timeCounter > 500) ? this.timeCounter = 0 : this.timeCounter++;
        if (this.blocks.length != 0) this.blocks.forEach(b => b.update());
        if (this.objs.length != 0) this.objs.forEach(obj => obj.update());

        if (this.game.x >= 8800 && this.game.x <= 8900 && this.finalAnimationTime != -1) {
            this.game.gameStage = this.game.GAME_STAGE.EVALDOFINALANIMATION;
            this.game.runningSongPlaying.pause();
        }
        if (this.boss != null) {
            this.boss.update();

            if (this.boss.lifeBar.points <= 0) {
                let nextLevel = document.getElementById("next-level");
                nextLevel.click();
            }
        }

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
                        } else {
                            this.game.level = new Level(this.game, danielLevel);
                            this.game.gameObjects.push(this.game.level);
                            this.game.runGame();
                        }
                    } else if (this.game.gameStage == this.game.GAME_STAGE.GAMEOVER) {
                        let sameLevel = document.getElementById("same-level");
                        sameLevel.click();
                    } else if (this.game.gameStage == this.game.GAME_STAGE.EVALDOFINALANIMATION) {
                        this.game.level.skipFinalAnimation();
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
                case 81:
                    if (this.game.gameStage == this.game.GAME_STAGE.RUNNING &&
                        this.game.level.level == danielLevel &&
                        this.game.level.finalAnimationDone) {
                        this.game.releasePower();
                    }
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
        this.lastMove = "noMove";
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
    horizontalColision() {
        let colision = false;
        this.game.level.blocks.
            filter(b => b.className == "Block")
            .forEach(b => {
                if (rightColision(this, b) || leftColision(this, b) ||
                    headRightColision(this, b) || headLeftColision(this, b)) {
                    colision = true;
                }
            });
        this.game.level.objs.
            forEach(fountain => {
                if (rightColision(this, fountain) || leftColision(this, fountain) ||
                    headRightColision(this, fountain) || headLeftColision(this, fountain)) {
                    colision = true;
                }
            });
        return colision;
    }
    walkLeft() {
        if (this.game.gameStage == this.game.GAME_STAGE.RUNNING && !this.horizontalColision()) {
            this.image = this.imageLeft;
            this.cape = this.capeLeft;
            if (this.game.x <= 50) {
                this.game.x = 50;
                this.speed.x = 0;
                this.lastMove = "noMove";
            } else {
                this.speed.x = -50;
                this.game.x += this.speed.x;
                this.lastMove = "left";
            }
        }
    }
    walkRight() {
        if (this.game.gameStage == this.game.GAME_STAGE.RUNNING && !this.horizontalColision()) {

            this.image = this.imageRight;
            this.cape = this.capeRight;
            if (this.position.x + this.width >= this.game.width - 200) {
                this.position.x = this.game.width - this.width - 200;
            } else if (this.game.x <= 9000 + this.width) {
                this.speed.x = 50;
            }
            if (this.game.x <= 9000 + this.width) {
                this.game.x += 50;
                this.lastMove = "right";
            }
        }
    }
    jump() {
        if (this.game.gameStage == this.game.GAME_STAGE.RUNNING) {
            if (this.position.y >= this.game.height / 4 - this.height) {
                this.speed.y = -50;
            }
        }
    }
    update() {
        console.log(this.game.x);
        // this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if (this.speed.x == 0) {
            this.lastMove = "noMove";
        }
        this.speed.x = 0;

        let isOnABlock = false;
        if (this.game.level) {

            this.game.level.blocks.forEach(obj => {
                if (obj.className == "Block" &&
                    (this.capePosition.y + this.capeHeight < obj.position.y + (obj.height / 5)) &&
                    ((this.capePosition.y + this.capeHeight) >= obj.position.y) &&
                    (this.position.x >= obj.position.x - 20) &&
                    (this.position.x + (this.width / 2) <= obj.position.x + obj.width + 20)) {
                    isOnABlock = true;
                }
            });
        }
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
    constructor(game, posX, posY) {
        this.game = game;
        this.img = document.getElementById("block");

        this.className = "Block";

        this.width = 100;
        this.height = 100;

        this.position = { x: posX, y: posY };
    }
    draw() {
        if (this.position.x >= -this.width && this.position.x + this.width <= this.game.width)
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
function rightColision(character, obj) {
    let cRight = character.capePosition.x + character.capeWidth;
    let cMiddleY = (character.position.y + character.height + character.capePosition.y + character.capeHeight) / 1.8;
    let objLeft = obj.position.x;
    let objRight = obj.position.x + obj.width;
    let objTop = (obj.position.y + 10);
    let objBottom = obj.position.y + obj.height;
    return (cRight >= objLeft && cRight < objRight &&
        cMiddleY <= objBottom && cMiddleY >= objTop);
}
function headRightColision(character, obj) {
    let cRight = character.position.x + character.width;
    let cMiddleY = (character.position.y + (character.height / 3.5));
    let objLeft = obj.position.x;
    let objRight = obj.position.x + obj.width;
    let objTop = (obj.position.y + 10);
    let objBottom = obj.position.y + obj.height;
    return (cRight >= objLeft && cRight < objRight &&
        cMiddleY <= objBottom && cMiddleY >= objTop);
}
function leftColision(character, obj) {
    let cLeft = character.capePosition.x;
    let cMiddleY = (character.position.y + character.height + character.capePosition.y + character.capeHeight) / 1.8;
    let objLeft = obj.position.x;
    let objRight = obj.position.x + obj.width;
    let objTop = (obj.position.y + 10);
    let objBottom = obj.position.y + obj.height;
    return (cLeft > objLeft && cLeft <= objRight &&
        cMiddleY <= objBottom && cMiddleY >= objTop);
}
function headLeftColision(character, obj) {
    let cLeft = character.position.x;
    let cMiddleY = (character.position.y + (character.height / 3.5));
    let objLeft = obj.position.x;
    let objRight = obj.position.x + obj.width;
    let objTop = (obj.position.y + 10);
    let objBottom = obj.position.y + obj.height;
    return (cLeft > objLeft && cLeft <= objRight &&
        cMiddleY <= objBottom && cMiddleY >= objTop);
}
function bottomColision(character, obj) {
    let cBottom = character.capePosition.y + character.capeHeight;
    let cLeft = character.capePosition.x;
    let cRight = character.capePosition.x + character.capeWidth;

    let objTop = obj.position.y;
    let objMiddleY = obj.position.y + (obj.height / 2.5);
    let objMiddleX = obj.position.x + (obj.width / 2);

    return (cBottom >= objTop && cBottom < objMiddleY &&
        objMiddleX >= cLeft && objMiddleX <= cRight);
}

GAME_STAGE = { MENU: 0, RUNNING: 1, PAUSED: 2, GAMEOVER: 3, EVALDOFINALANIMATION: 4 };


let game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT, ctx, GAME_STAGE);
game.start();

function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    game.draw();
    game.update();
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);


