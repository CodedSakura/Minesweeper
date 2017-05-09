(() => {
    let body = (() => {
        let body = document.createElement("div");
        body.classList.add("body");
        document.body.appendChild(body);
        return body;
    })(), grid = [], currDiff = 0;

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

        picker.classList.add("right-menu");
        body.appendChild(picker);
        let diffSelect = document.createElement("div");
        picker.appendChild(diffSelect);
        diffSelect.classList.add("diff-select");
        diffSelect.appendChild(document.createTextNode(selector[currDiff].text));
        diffSelect.addEventListener("click", m => {
            m.preventDefault();
            currDiff++;
            currDiff %= selector.length;
            if (document.getElementById("gridBody"))
                body.removeChild(document.getElementById("gridBody"));
            createGrid(selector[currDiff].size, selector[currDiff].mines);
            diffSelect.removeChild(diffSelect.firstChild);
            diffSelect.appendChild(document.createTextNode(selector[currDiff].text));
        });
        createGrid(selector[currDiff].size, selector[currDiff].mines)
    })();

    function createGrid(size, mineCount) {
        let gridBody = document.createElement("div");
        gridBody.id = "gridBody";
        gridBody.classList.add("grid");
        // body.appendChild(gridBody);
        body.prepend(gridBody);
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