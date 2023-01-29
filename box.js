class Box {
    constructor(color, state, row, timer = 500) {
        this.color = color;
        this.state = state;
        this.row = row;
        this.timer = timer;
        this.crossState = false;
        this.box = this.init();
        this.startState = false;
        this.visibleState = false;
        this.box.addEventListener('click', this.handleMouseDown.bind(this));
    }
    init() {
        let box = document.createElement('div');
        box.style.backgroundColor = this.color;
        return box;
    }
    visible() {
        this.box.style.backgroundColor = this.color;
        this.visibleState = true;
    }
    invisible() {
        this.box.style.backgroundColor = "var(--black)";
        this.visibleState = false;
    }
    bordered() {
        this.box.style.borderTop = "10px solid var(--blue)";
        this.borderState = 1;
    }
    handleMouseDown() {
        if (this.state == 1 && this.startState) {
            this.visible();
            game.checker(true);
        } else if (this.state == 0 && this.startState) {
            if (!this.crossState) {
                this.cross();
            }
            game.checker(false);
        }
    }
    cross() {
        this.crossState = true;
        let bar1 = document.createElement('div');
        let bar2 = document.createElement('div');
        bar1.style.transform = "translate(-50%, -50%) rotate(45deg)";
        bar2.style.transform = "translate(-50%, -50%) rotate(-45deg)";
        this.box.appendChild(bar1);
        this.box.appendChild(bar2);
    }
    error() {
        this.startState = false;
        this.box.style.transitionDuration = "0s";
        this.box.style.backgroundColor = "var(--black)";
        setTimeout(() => {
            this.box.style.backgroundColor = this.color;
        }, (this.timer / 5) * 1);
        setTimeout(() => {
            this.box.style.backgroundColor = "var(--black)";
        }, (this.timer / 5) * 2);
        setTimeout(() => {
            this.box.style.backgroundColor = this.color;
        }, (this.timer / 5) * 3);
        setTimeout(() => {
            this.box.style.backgroundColor = "var(--black)";
        }, (this.timer / 5) * 4);
        setTimeout(() => {
            this.box.style.backgroundColor = this.color;
            this.box.style.transitionDuration = "0.3s";
            this.startState = true;
        }, (this.timer / 5) * 5);
    }
}