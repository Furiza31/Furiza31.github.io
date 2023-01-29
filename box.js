class Box {
    constructor(color, state, row) {
        this.color = color;
        this.state = state;
        this.row = row;
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
            game.checker(false);
        }
    }
}