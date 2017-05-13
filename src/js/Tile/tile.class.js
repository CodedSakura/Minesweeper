class Tile {
    constructor(x, y, elem) {
        this.x = x;
        this.y = y;
        this.mine = false;
        this.flag = false;
        this.value = 0;
        this.elem = elem;
    }

    leftClick() {
        console.log("left click, tile ", this.x, this.y, "; mine ", this.mine, "; value ", this.value);
        //TODO: implement left-clicking a tile
    }

    rightClick() {
        console.log("right click, tile ", this.x, this.y, "; mine ", this.mine, "; value ", this.value);
        //TODO: implement flags
    }
}

module.exports = Tile;