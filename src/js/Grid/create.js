let Tile = require("../Tile/tile.class.js");

function createGrid(grid, gridBody, size, mineCount) {
    while (gridBody.hasChildNodes())
        gridBody.removeChild(gridBody.firstChild);
    for (let y = 0; y < size; y++) {
        grid.push([]);
        let row = document.createElement("div");
        row.classList.add("row");
        gridBody.appendChild(row);
        for (let x = 0; x < size; x++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.style.width = `${640 / size}px`;
            tile.style.height = `${640 / size}px`;
            row.appendChild(tile);
            grid[y].push(new Tile(x, y, tile));
            tile.addEventListener("click", m => {
                let index = iop2D(grid, {elem: m.target});
                grid[index[0]][index[1]].leftClick();
                m.preventDefault();
            });
            tile.addEventListener("contextmenu", m => {
                let index = iop2D(grid, {elem: m.target});
                grid[index[0]][index[1]].rightClick();
                m.preventDefault();
            });
        }
    }
}

function iop2D (array, input) { // index of object in a 2D array
    function iop (arr, input) { // index of object in an array
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][Object.keys(input)[0]] === Object.values(input)[0]) {
                return i;
            }
        }
        return -1;
    }

    for (let i = 0; i < array.length; i++) {
        if (!Array.isArray(array[i])) continue;
        if (iop(array[i], input) !== -1) return [parseInt(i), iop(array[i], input)];
    }
    return -1;
}

module.exports = createGrid;