createGrid = require("../Grid/create.js");

module.exports = (body, currDiff, gridBody) => {
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
    ], picker = document.createElement("div"), globalGridProp, makeGrid = currDiff => {
        globalGridProp = createGrid(gridBody, selector[currDiff].size, selector[currDiff].mines, timer);
    };

    picker.classList.add("right-menu");
    body.appendChild(picker);

    let diffSelect = document.createElement("div"),
        reset = document.createElement("div"),
        timer = document.createElement("div");

    picker.appendChild(diffSelect);
    diffSelect.classList.add("button");
    diffSelect.appendChild(document.createTextNode(selector[currDiff].text));
    diffSelect.addEventListener("click", m => {
        clearInterval(globalGridProp.timer);
        timer.innerText = "--:--";
        currDiff++;
        currDiff %= selector.length;
        makeGrid(currDiff);
        diffSelect.removeChild(diffSelect.firstChild);
        diffSelect.appendChild(document.createTextNode(selector[currDiff].text));
        m.preventDefault();
    });

    picker.appendChild(reset);
    reset.classList.add("button");
    reset.appendChild(document.createTextNode("Reset"));
    reset.addEventListener("click", m => {
        clearInterval(globalGridProp.timer);
        timer.innerText = "--:--";
        makeGrid(currDiff);
        m.preventDefault();
    });

    picker.appendChild(timer);
    timer.classList.add("clock");
    timer.innerText = "--:--";

    makeGrid(currDiff);
};