(() => {
    let body = (() => {
        let body = document.createElement("div");
        body.classList.add("body");
        document.body.appendChild(body);
        return body;
    })(), grid = [];

    // difficulty selector
    (function chooseDiff() {
        let selector = [
            {
                text: "Easy (8x8, 10 mines)",
                size: 8,
                mines: 10
            },
            {
                text: "Medium (16x16, 40 mines)",
                size: 16,
                mines: 40
            },
            {
                text: "Hard (24x24, 99 mines)",
                size: 24,
                mines: 99
            }
        ], picker = document.createElement("div");
        body.appendChild(picker);
        for (let i of selector) {
            let div = document.createElement("div");
            picker.appendChild(div);
            div.classList.add("diff");
            div.appendChild(document.createTextNode(i.text));
            div.addEventListener("click", m => {
                m.preventDefault();
                if (document.getElementById("gridBody"))
                    body.removeChild(document.getElementById("gridBody"));
                createGrid(i.size, i.mines);
            });
        }
    })();

    function createGrid(size, mineCount) {
        let gridBody = document.createElement("div");
        gridBody.id = "gridBody";
        body.appendChild(gridBody);
        for (let y = 0; y < size; y++) {
            grid.push([]);
            let row = document.createElement("div");
            row.classList.add("row");
            gridBody.appendChild(row);
            //TODO: make a horizontal div
            for (let x = 0; x < size; x++) {
                let tile = document.createElement("div");
                tile.classList.add("tile");
                tile.style.width = `${640 / size}px`;
                tile.style.height = `${640 / size}px`;
                row.appendChild(tile);
                grid[y].push(new Tile(x, y, tile));
                //TODO: do things to `elem`
            }
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

    function iop2D (array, input) { // index of object in a 2D array
        function iop (arr, input) { // index of object in an array
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][Object.keys(input)[0]] === Object.values(input)[0])
                    return i;
            }
            return -1;
        }

        for (let i = 0; i < array.length; i++) {
            if (!Array.isArray(array[i])) continue;
            if (iop(array[i], input) !== -1) return [parseInt(i), array[i].iop(input)];
        }
        return -1;
    }
})();
//.target