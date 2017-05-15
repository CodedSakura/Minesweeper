let body = document.createElement("div"),
    gridBody = document.createElement("div"),
    currDiff = 0;

body.classList.add("body");
document.body.appendChild(body);

gridBody.id = "gridBody";
gridBody.classList.add("grid");
body.appendChild(gridBody);

require("../Difficulty/selector.js")(body, currDiff, gridBody);
