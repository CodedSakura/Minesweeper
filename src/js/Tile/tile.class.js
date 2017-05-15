class Tile {
    constructor(x, y, elem, grid, globalGridProp) {
        this.x = x;
        this.y = y;
        this.mine = false;
        this.flag = false;
        this.visible = false;
        this.value = 0;
        this.elem = elem;
        this.grid = grid;
        this.gridProp = globalGridProp;
    }

    leftClick(clearNeighbours) {
        if (!this.gridProp.clicked) {
            require("../Grid/utils.js").populate(this.grid, this.x, this.y, this.gridProp.mineCount);
            this.gridProp.clicked = true;
            this.gridProp.timerDiv.innerText = "00:00";
            this.gridProp.timer = setInterval(() => {
                this.gridProp.time++;
                let time = this.gridProp.time, mins = Math.floor(time / 60), secs = time % 60;
                this.gridProp.timerDiv.innerText = (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);
            }, 1000);
        }
        if (this.gridProp.gameOver) return;
        if (this.flag) return;
        if (this.visible && this.value > 0 && !clearNeighbours) {
            let flagCounter = 0;
            this.forEachNeighbour(tile => {
                if (tile.flag) flagCounter++;
            });
            if (this.value === flagCounter) {
                this.forEachNeighbour(tile => tile.leftClick(true));
            }
        } else if (this.visible) return;
        this.visible = true;
        if (this.mine) {
            this.elem.classList.add("tile-mine-clicked");
            this.elem.innerText = "💣";
            for (let i of this.grid) {
                for (let j of i) {
                    j.elem.classList.add("tile-seen");
                    if (!j.mine) {
                        j.elem.classList.add("tile-" + j.value);
                        j.elem.innerText = j.value;
                    }
                    if (j.mine && !j.flag) {
                        j.elem.classList.add("tile-mine");
                        j.elem.innerText = "💣";
                    } else if (!j.mine && j.flag) {
                        j.elem.classList.add("tile-mine-false");
                        j.elem.innerText = "⚑"
                    }
                }
            }
            this.gridProp.gameOver = true;
            clearInterval(this.gridProp.timer);
        } else {
            this.elem.classList.add("tile-seen");
            this.elem.classList.add("tile-" + this.value);
            this.elem.innerText = this.value;
            if (this.value === 0) {
                this.forEachNeighbour(tile => {
                    if (!tile.visible) tile.leftClick();
                })
            }
        }
        for (let i of this.grid) for (let j of i) if (!j.mine && !j.visible) return;
        this.gridProp.gameOver = true;
        clearInterval(this.gridProp.timer);
        console.log("You won!");
    }

    rightClick() {
        if (this.visible || this.gridProp.gameOver) return;
        if (!this.flag) {
            this.elem.classList.add("tile-flag");
            this.elem.innerText = "⚑";
            this.flag = true;
        } else {
            this.elem.classList.remove("tile-flag");
            this.elem.innerText = "";
            this.flag = false;
        }
        let flags = require("../Grid/utils.js").countFlags(this.grid);
        this.gridProp.mineCountDiv.innerText = `${flags < 10 ? "0" + flags : flags}/${this.gridProp.mineCount}`;
    }

    forEachNeighbour(func) {
        for (let i = this.x - 1; i <= this.x + 1; i++) {
            for (let j = this.y - 1; j <= this.y + 1; j++) {
                if (i < 0 || j < 0 || i >= this.grid.length || j >= this.grid.length) continue;
                if (i === this.x && j === this.y) continue;
                func(this.grid[j][i]);
            }
        }
    }

    highlight() {
        if (!this.flag) {
            this.elem.classList.add("tile-pressed");
        }
    }

    diminish() {
        this.elem.classList.remove("tile-pressed");
    }
}

module.exports = Tile;