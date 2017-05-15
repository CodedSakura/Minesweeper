let iop2D = (array, input) => { // index of object in a 2D array
        let iop = (arr, input) => { // index of object in an array
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][Object.keys(input)[0]] === Object.values(input)[0]) {
                    return i;
                }
            }
            return -1;
        };

        for (let i = 0; i < array.length; i++) {
            if (!Array.isArray(array[i])) continue;
            if (iop(array[i], input) !== -1) return [parseInt(i), iop(array[i], input)];
        }
        return -1;
    }, countMines = grid => {
        let counter = 0;
        for (let i of grid) for (let j of i) if (j.mine) counter++;
        return counter;
    }, countFlags = grid => {
        let counter = 0;
        for (let i of grid) for (let j of i) if (j.flag) counter++;
        return counter;
    }, populate = (grid, clickX, clickY, mineCount) => {
        while (countMines(grid) < mineCount) {
            let randomPos = [Math.floor(Math.random() * grid.length), Math.floor(Math.random() * grid.length)];
            grid[randomPos[0]][randomPos[1]].mine = true;
            grid[clickY][clickX].mine = false;
            grid[clickY][clickX].forEachNeighbour(tile => tile.mine = false);
        }
        for (let i of grid) {
            for (let j of i) {
                let mineCounter = 0;
                j.forEachNeighbour(tile => {
                    if (tile.mine) mineCounter++;
                });
                j.value = mineCounter;
            }
        }
    };

module.exports = {
    iop2D: iop2D,
    populate: populate,
    countFlags: countFlags
};
