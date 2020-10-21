import { useState } from 'react';
import { getAdjacentValues } from '../Utils/adjacentSpaces';
import { useAdjacent } from './useAdjacent';
import { getAdjacentCoords } from '../Utils/adjacentSpaces'

const useGenerateBoard = (settings, setGameBoard) => {
    const [{ width, height, mines }] = useState(settings);

    const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    
    const generateMines = (mines, max) => {
        for(var i = 1; i <= max; i++) {
        mines.push([
            randomIntFromInterval(0, height - 1),
            randomIntFromInterval(0, width - 1)
        ].toString());
        }
        mines = mines.filter((mine, index) => mines.indexOf(mine) === index)
        if(mines.length < mines) {
            generateMines(mines, mines - mines.length)
        }
        return mines;
    }
    
    const generateBoard = () => {
        setGameBoard([]);
        var board = [];
        var adjacents = [];
        var mineCoords = generateMines([], mines);
    
        for(var h = 1; h <= height; h++) {
            var row = [];
            for(var w = 1; w <= width; w++) {
                row.push(0);
            }
            board.push(row);
        }
    
        mineCoords.forEach(coords => {
            var [h, w] = coords.split(",");
            board[h][w] -= 1;
        });
    
        board.forEach((row, rowIndex) => {
            var adjacentRow = [];
            row.forEach((space, spaceIndex) => {
                if(space === 0) {
                    var adjacent = getAdjacentValues([rowIndex, spaceIndex], board, settings)
                    board[rowIndex][spaceIndex] += adjacent.filter(a => a < 0).length
                }
                var adjacentToThis = getAdjacentCoords([rowIndex, spaceIndex], board, settings);
                adjacentRow.push(adjacentToThis);
            })
            adjacents.push(adjacentRow);
        })
        
        setGameBoard({
            board,
            adjacents
        });
    }

    return generateBoard;
}

export default useGenerateBoard;