Array.prototype.iop2D = function (input) {
    function iop (arr, input) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][Object.keys(input)[0]] === Object.values(input)[0]) return i;
        }
        return -1;
    }

    for (let i = 0; i < this.length; i++) {
        if (!this.hasOwnProperty(i)) continue;
        if (!Array.isArray(this[i])) continue;
        if (iop(this[i], input) !== -1) return [parseInt(i), this[i].iop(input)];
    }
    return -1;
};

(a => {
    if (![1, 2, 3].includes(a)) return;

    let body = (() => {
        let body = document.createElement("div");
        body.classList.add("body");
        document.body.appendChild(body);
        return body;
    })(), grid = [], s = a * 8;

    for (let x = 0; x < s; x++) {
        grid.push([]);
        //TODO: make a horizontal div
        for (let y = 0; y < s; y++) {
            let elem = document.createElement("div");
            grid[x].push(new Tile(x, y, elem));
            //TODO: do things to `elem`
        }
    }

    class Tile {
        constructor(x, y, elem) {
            this.x = x;
            this.y = y;
            this.mine = false;
            this.flag = false;
            this.value = 0;
            this.elem = elem;
        }

        leftclick() {
            //TODO: implement left-clicking a tile
        }

        rightclick() {
            //TODO: implement flags
        }
    }
})(parseInt(location.hash.substr(1)));
//.target