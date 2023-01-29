class Game {
    constructor() {
        this.board = [];
        this.level = 0;
        this.timer = 0;
        this.gameBoard = document.getElementById('game-board');
        this.button = document.getElementById('button');
        this.rainBowIndex = 0;
        this.maxRainBow = 20;
        this.lastRowDrawn = 0;
        this.rowToGenerate = 1;
        this.lastRowRevealed = 0;
        this.lastRowMaxGenerated = 0;
        this.timer = 500;
        this.buttonState = false;
        this.startState = false;
        this.error = 0;
        this.button.addEventListener('click', () => {
            if (this.buttonState) {
                this.start();
            }
        });
    }
    addRow() {
        let row = [];
        let random = Math.floor(Math.random() * 5);
        for (let i = 0; i < 5; i++) {
            let box = new Box(`hsl(${360 * this.rainBowIndex / this.maxRainBow}, 80%, 50%)`, 0);
            row.push(box);
        }
        this.rainBowIndex++;
        if (this.rainBowIndex > this.maxRainBow) {
            this.rainBowIndex = 0;
        }
        row[random].state = 1;
        this.board.push(row);
    }
    draw() {
        let rowSize = this.board[this.board.length - 1].length;
        for (let i = this.lastRowDrawn; i < this.board.length; i++) {
            for (let j = 0; j < rowSize; j++) {
                this.gameBoard.appendChild(this.board[i][j].box);
            }
        }
        this.lastRowDrawn = this.board.length;
    }
    reveal() {
        for (let i = 0; i < this.board[this.lastRowMaxGenerated].length; i++) {
            this.board[this.lastRowMaxGenerated][i].bordered();
        }
        for (let i = this.lastRowRevealed; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                setTimeout(() => {
                    if (this.board[i][j].state == 1) {
                        this.board[i][j].visible();
                    } else {
                        this.board[i][j].invisible();
                    }
                    this.lastRowRevealed = i;
                    window.scrollTo(0, this.board[i][j].box.offsetTop);
                }, this.timer * (i - this.lastRowRevealed));
            }
        }
    }
    fastReveal() {
        window.scrollTo(0, this.board[this.lastRowRevealed][0].box.offsetTop);
        for (let i = this.lastRowRevealed; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j].state == 1) {
                    this.board[i][j].visible();
                } else {
                    this.board[i][j].invisible();
                }
                this.lastRowRevealed = i;
            }
        }
    }
    enableButton() {
        this.button.style.backgroundColor = "var(--blue)";
        this.buttonState = true;
    }
    disableButton() {
        this.button.style.backgroundColor = "var(--red)";
        this.buttonState = false;
    }
    generate() {
        for (let i = 0; i < this.rowToGenerate; i++) {
            this.addRow();
        }
        this.draw();
        this.reveal();
        this.rowToGenerate++;
        this.disableButton();
        setTimeout(() => {
            this.enableButton();
        }, this.timer * (this.board.length - this.lastRowRevealed));
    }
    customGenerate(custom) {
        this.board = custom;
        this.draw();
        this.reveal();
        this.rowToGenerate++;
        this.disableButton();
        setTimeout(() => {
            this.enableButton();
        }, this.timer * (this.board.length - this.lastRowRevealed));
    }
    hide() {
        for (let i = this.lastRowMaxGenerated; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                this.board[i][j].startState = true;
                if (this.board[i][j].state == 1) {
                    this.board[i][j].invisible();
                }
            }
        }
    }
    start() {
        this.startState = true;
        this.hide();
        this.disableButton();
    }
    stop() {
        this.errorUp();
        this.startState = false;
        this.lastRowRevealed = this.lastRowMaxGenerated;
        this.fastReveal();
        this.enableButton();
    }
    levelUp() {
        this.level++;
        document.getElementById('level').innerHTML = this.level;
    }
    errorUp() {
        this.error++;
        document.getElementById('error').innerHTML = this.error;
    }
    clearBoard() {
        this.board = [];
        this.lastRowMaxGenerated = 0;
        this.lastRowRevealed = 0;
        this.lastRowDrawn = 0;
        this.gameBoard.innerHTML = "";
    }
    checker(correctAnswer) {
        if (this.startState) {
            if (correctAnswer) {
                let won = true;
                for (let i = this.lastRowMaxGenerated; i < this.board.length; i++) {
                    for (let j = 0; j < this.board[i].length; j++) {
                        if (this.board[i][j].state == 1) {
                            if (!this.board[i][j].visibleState) {
                                won = false;
                            }
                        }
                    }
                }
                if (won) {
                    this.lastRowMaxGenerated = this.board.length;
                    this.startState = false;
                    if (this.rowToGenerate % 3 == 0) {
                        this.clearBoard();
                        this.levelUp();
                    }
                    this.generate();
                }
            } else {
                this.stop();
            }
        }
    }
}

let game = new Game();
let custom = [
    [
        new Box("white", 0),
        new Box("white", 0),
        new Box("white", 0),
        new Box("white", 0),
        new Box("white", 0)
    ],
    [
        new Box("white", 0),
        new Box("red", 1),
        new Box("red", 1),
        new Box("red", 1),
        new Box("white", 0)
    ],
    [
        new Box("red", 1),
        new Box("red", 1),
        new Box("red", 1),
        new Box("red", 1),
        new Box("red", 1)
    ],
    [
        new Box("white", 0),
        new Box("red", 1),
        new Box("red", 1),
        new Box("red", 1),
        new Box("white", 0)
    ],
    [
        new Box("white", 0),
        new Box("white", 0),
        new Box("red", 1),
        new Box("white", 0),
        new Box("white", 0)
    ],
    [
        new Box("white", 0),
        new Box("white", 0),
        new Box("white", 0),
        new Box("white", 0),
        new Box("white", 0)
    ]
];
game.customGenerate(custom);