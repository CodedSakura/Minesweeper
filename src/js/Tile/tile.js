(() => {
    let body = document.createElement("div"),
        gridBody = document.createElement("div"),
        grid = [], currDiff = 0;

    body.classList.add("body");
    document.body.appendChild(body);

    gridBody.id = "gridBody";
    gridBody.classList.add("grid");
    body.appendChild(gridBody);

    require("../Difficulty/selector.js")(body, currDiff, grid, gridBody);
})();

let dragActivate = (() => {
    return () => {

        let _main = () => {

        };

        _main();
        return {

        }
    }
});
