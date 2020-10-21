const getAdjacentValues = (space, board, settings) => {
    var [h, w] = space;
    var widthMinus = w - 1;
    var widthPlus = w + 1;
    var heightMinus = h - 1;
    var heightPlus = h + 1;
    var topLeft = heightMinus >= 0 && widthMinus >= 0;
    var top = heightMinus >= 0;
    var topRight = heightMinus >= 0 && widthPlus <= settings.width - 1;
    var left = widthMinus >= 0;
    var right = widthPlus <= settings.width - 1;
    var bottomLeft = heightPlus <= settings.height - 1 && widthMinus >= 0;
    var bottom = heightPlus <= settings.height - 1;
    var bottomRight = heightPlus <= settings.height - 1 && widthPlus <= settings.width - 1;
  
    return [
      topLeft ? board[h - 1][w - 1] : null,
      top ? board[h - 1][w] : null,
      topRight ? board[h - 1][w + 1] : null,
      left ? board[h][w - 1] : null,
      right ? board[h][w + 1] : null,
      bottomLeft ? board[h + 1][w - 1] : null,
      bottom ? board[h + 1][w] : null,
      bottomRight ? board[h + 1][w + 1] : null
    ];
  }
  
const getAdjacentCoords = (space, board, settings) => {
    var [h, w] = space;
    var widthMinus = w - 1;
    var widthPlus = w + 1;
    var heightMinus = h - 1;
    var heightPlus = h + 1;
    //var topLeft = heightMinus >= 0 && widthMinus >= 0;
    var top = heightMinus >= 0;
    //var topRight = heightMinus >= 0 && widthPlus <= settings.width - 1;
    var left = widthMinus >= 0;
    var right = widthPlus <= settings.width - 1;
    //var bottomLeft = heightPlus <= settings.height - 1 && widthMinus >= 0;
    var bottom = heightPlus <= settings.height - 1;
    //var bottomRight = heightPlus <= settings.height - 1 && widthPlus <= settings.width - 1;

    var coords = [
        //topLeft ? [h - 1, w - 1] : null,
        top ? [h - 1, w] : null,
        //topRight ? [h - 1, w + 1] : null,
        left ? [h, w - 1] : null,
        right ? [h, w + 1] : null,
        //bottomLeft ? [h + 1, w - 1] : null,
        bottom ? [h + 1, w] : null,
        //bottomRight ? [h + 1, w + 1] : null
    ];

    return coords.filter(a => a !== null && a.toString() !== coords.toString());
}

const processAdjacent = (spaces, board, settings) => {
    var spacesToClick = [];
    spaces.forEach(space => {
        let [h, w] = space;
        let value = board[h][w];
        var adjacentToThisSpace = [];
        var nextAdjacent = [];
        if (value < 0) {
            return;
        }     
        spacesToClick.push(space);
        if (value > 0) {       
            return;
        }
        // adjacentToThisSpace = getAdjacentCoords(space, board, settings);
        // nextAdjacent = processAdjacent(adjacentToThisSpace, board, settings)
        // spacesToClick = [...spacesToClick, ...nextAdjacent];
    });

    return spacesToClick;
}

const findNotMines = (spaces, board, settings) => {
    var spacesToClick = [];
    spaces.forEach(space => {
        var [h, w] = space;
        var adjacentToThisSpace = [];
        var nextAdjacent = [];
        if (spacesInclude(spacesToClick, space) || isMine(space, board)) {
            return;
        }

        spacesToClick.push([h, w]);
        adjacentToThisSpace = getAdjacentCoords([h, w], board, settings, spacesToClick);
        
        nextAdjacent = findNotMines(adjacentToThisSpace, board, settings);
        spacesToClick = [...spacesToClick, ...nextAdjacent];
    });

    return spacesToClick;
}

const spacesInclude = (spaces, coords) => {
    return spaces.length > 1 && spaces.some(s => s[0] === coords[0] && s[1] === coords[1]);
}

const isMine = (space, board) => board[space[0]][space[1]] < 0;
  
export { getAdjacentValues, getAdjacentCoords, processAdjacent };