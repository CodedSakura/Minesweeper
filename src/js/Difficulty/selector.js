createGrid = require("../Grid/create.js");

module.exports = (body, currDiff, grid, gridBody) => {
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

    let diffSelect = document.createElement("div"),
        reset = document.createElement("div");

    picker.appendChild(diffSelect);
    diffSelect.classList.add("diff-select");
    diffSelect.appendChild(document.createTextNode(selector[currDiff].text));
    diffSelect.addEventListener("click", m => {
        currDiff++;
        currDiff %= selector.length;
        createGrid(selector[currDiff].size, selector[currDiff].mines);
        diffSelect.removeChild(diffSelect.firstChild);
        diffSelect.appendChild(document.createTextNode(selector[currDiff].text));
        m.preventDefault();
    });

    picker.appendChild(reset);
    reset.classList.add("reset");
    reset.appendChild(document.createTextNode("Reset"));
    reset.addEventListener("click", m => {
        createGrid(grid, gridBody, selector[currDiff].size, selector[currDiff].mines);
        m.preventDefault();
    });

    createGrid(grid, gridBody, selector[currDiff].size, selector[currDiff].mines);
};