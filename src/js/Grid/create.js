let Tile = require("../Tile/tile.class.js");
let utils = require("./utils.js");

let mouseDown = false;

function createGrid(gridBody, size, mineCount, timerDiv) {
    let grid = [], globalGridProp = {
        clicked: false,
        mineCount: mineCount,
        gameOver: false,
        time: 0,
        timer: null,
        timerDiv: timerDiv
    };

    while (gridBody.hasChildNodes()) {
        gridBody.removeChild(gridBody.firstChild);
    }

    gridBody.addEventListener("mousedown", m => {
        mouseDown = true;
        m.preventDefault();
    });
    gridBody.addEventListener("mouseup", m => {
        mouseDown = false;
        m.preventDefault();
    });
    gridBody.addEventListener("contextmenu", m => m.preventDefault());

    for (let y = 0; y < size; y++) {

        grid.push([]);

        let row = document.createElement("div");
        row.classList.add("row");
        gridBody.appendChild(row);

        for (let x = 0; x < size; x++) {

            let tileNode = document.createElement("div"),
                tile = new Tile(x, y, tileNode, grid, globalGridProp);
            tileNode.classList.add("tile");
            tileNode.style.width = `${640 / size}px`;
            tileNode.style.height = `${640 / size}px`;
            tileNode.style.fontSize = `${560 / size}px`;
            row.appendChild(tileNode);

            grid[y].push(tile);

            tileNode.addEventListener("mouseenter", m => {
                if (mouseDown) tile.highlight();
                m.preventDefault();
            });
            tileNode.addEventListener("mouseleave", m => {
                if (mouseDown) tile.diminish();
                m.preventDefault();
            });
            tileNode.addEventListener("mousedown", m => {
                tile.highlight();
                m.preventDefault();
            });
            tileNode.addEventListener("mouseup", m => {
                tile.diminish();
                if (m.button === 0) tile.leftClick();
                else if (m.button === 2) tile.rightClick();
                m.preventDefault();
            });
        }
    }

    return globalGridProp;
}

module.exports = createGrid;