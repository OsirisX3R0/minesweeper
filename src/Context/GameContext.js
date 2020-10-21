import React, {createContext, useState, useCallback, useEffect} from 'react'
import gridl from 'gridl'
//import useGenerateBoard from '../Hooks/useGenerateBoard'
//import { getAdjacentValues, getAdjacentCoords } from '../Utils/adjacentSpaces';
import randomIntFromInterval from '../Utils/randomIntFromInterval';
import { createGlobalStyle } from 'styled-components';
import { background, foreground } from '../Styles/variables';

export const GameContext = createContext();

const GlobalStyles = createGlobalStyle`
    body, input, button {
        background-color: ${background};
        color: ${foreground};
        font-family: 'Spartan', sans-serif;
    }
`

export const GameProvider = ({ children }) => {
    const [width, setWidth] = useState(8)
    const [height, setHeight] = useState(8)
    const [mines, setMines] = useState(10)
    const [gameBoard, setGameBoard] = useState([])
    const [gameStarted, setGameStarted] = useState(false)
    const [openSpaces, setOpenSpaces] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    //const generateBoard = useGenerateBoard(settings, setGameBoard);

    useEffect(() => {
        if(gridl(gameBoard).find(s => s.isOpen))
            setOpenSpaces(getOpenSpaces())
    }, [gameBoard])

    const getOpenSpaces = () => gameBoard.flat().filter(s => s.isOpen).length

    const generateMines = (max, generatedMines = []) => {
        for(var i = 1; i <= max; i++) {
            generatedMines.push(
                `${randomIntFromInterval(1, height)}${randomIntFromInterval(1, width)}`
            );
        }
        generatedMines = generatedMines
            .filter((mine, index) => generatedMines.indexOf(mine) === index)
        if(generatedMines.length < max) {
            generateMines(mines - generatedMines.length, generatedMines)
        }
        return generatedMines;
    }

    const getAdjacentValues = (space, board) => {
        var [h, w] = space;
        var widthMinus = w - 1;
        var widthPlus = w + 1;
        var heightMinus = h - 1;
        var heightPlus = h + 1;
        var topLeft = heightMinus >= 0 && widthMinus >= 0;
        var top = heightMinus >= 0;
        var topRight = heightMinus >= 0 && widthPlus <= width - 1;
        var left = widthMinus >= 0;
        var right = widthPlus <= width - 1;
        var bottomLeft = heightPlus <= height - 1 && widthMinus >= 0;
        var bottom = heightPlus <= height - 1;
        var bottomRight = heightPlus <= height - 1 && widthPlus <= width - 1;
      
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
      
    const getAdjacentCoords = (space) => {
        var [h, w] = space;
        var widthMinus = w - 1;
        var widthPlus = w + 1;
        var heightMinus = h - 1;
        var heightPlus = h + 1;
        //var topLeft = heightMinus >= 0 && widthMinus >= 0;
        var top = heightMinus >= 0;
        //var topRight = heightMinus >= 0 && widthPlus <= width - 1;
        var left = widthMinus >= 0;
        var right = widthPlus <= width - 1;
        //var bottomLeft = heightPlus <= height - 1 && widthMinus >= 0;
        var bottom = heightPlus <= height - 1;
        //var bottomRight = heightPlus <= height - 1 && widthPlus <= width - 1;
    
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

    // const clickSpaces = (row, space) => {
    //     let adjacentToThis = adjacents[row][space]

    //     adjacentToThis.forEach(([row, space]) => {
    //         setGameBoard(prevBoard => prevBoard.map((thisRow, rowI) => (
    //             thisRow.map((thisSpace, spaceI) => (
    //                 row === rowI && space === spaceI
    //                     ? {...thisSpace, clicked: true}
    //                     : thisSpace
    //             ))
    //         )))
    //     })
    // }

    const getAllAdjacentSpaces = (board, row, space, alreadyAdjacent = []) => {
        let adjacent = getAdjacentCoords([row, space]).filter(s => s !== null)
        let already = [...alreadyAdjacent, [row, space]]

        if(!already.find(([aRow, aSpace]) => aRow === row && aSpace === space)) {
            adjacent.forEach(([thisRow, thisSpace]) => {
                if(board[thisRow][thisSpace] === 0) {
                    if (!already.find(([aRow, aSpace]) => thisRow === aRow && thisSpace === aSpace)) {
                        getAllAdjacentSpaces(board, thisRow, thisSpace, already)
                    }
                }
            })
        }

        return adjacent
    }

    const getAdjacentSpaces = (row, space) => {
        let cells = [space - 1, row - 1]
        return gridl(gameBoard).adjacentCellsAt(cells)
        // let topLeft = searchBoard(gameBoard, row - 1, space - 1)
        // let top = searchBoard(gameBoard, row - 1, space)
        // let topRight = searchBoard(gameBoard, row - 1, space + 1)
        // let left = searchBoard(gameBoard, row, space - 1)
        // let right = searchBoard(gameBoard, row, space + 1)
        // let bottomLeft = searchBoard(gameBoard, row + 1, space - 1)
        // let bottom = searchBoard(gameBoard, row + 1, space)
        // let bottomRight = searchBoard(gameBoard, row + 1, space + 1)

        // return [
        //     topLeft,
        //     top,
        //     topRight,
        //     left,
        //     right,
        //     bottomLeft,
        //     bottom,
        //     bottomRight
        // ].filter(s => s.id)
    }

    const getAdjacentMines = (board, row, space) => {
        let topLeft = searchBoard(board, row - 1, space - 1)
        let top = searchBoard(board, row - 1, space)
        let topRight = searchBoard(board, row - 1, space + 1)
        let left = searchBoard(board, row, space - 1)
        let right = searchBoard(board, row, space + 1)
        let bottomLeft = searchBoard(board, row + 1, space - 1)
        let bottom = searchBoard(board, row + 1, space)
        let bottomRight = searchBoard(board, row + 1, space + 1)

        return [
            topLeft.isMine,
            top.isMine,
            topRight.isMine,
            left.isMine,
            right.isMine,
            bottomLeft.isMine,
            bottom.isMine,
            bottomRight.isMine
        ].filter(s => s).length
    }

    const searchBoard = (board, row, space) => {
        return row > 0 && space > 0 && row <= height && space <= width
            ? board
                .find((thisRow, i) => thisRow && i === row - 1)
                .find(thisSpace => thisSpace.row === row && thisSpace.space === space)
            : { isMine: false }
    }

    const openSpace = (id, adjacent = []) => {
        let mineCount;
        let isMine;
        setGameBoard(prevBoard => 
            prevBoard.map(row => row.map(space => {
                if (space.id === id && !space.isOpen) {   
                    isMine = false
                    mineCount = space.mineCount                 
                    if (space.isMine) {
                        isMine = space.isMine
                        gameOverProcess()
                        return
                    }

                    return {...space, isOpen: true, isMarked: false}
                } else {
                    return space
                }
            }))
        )
        if (mineCount === 0 && !isMine && adjacent.length > 0) {
            openAdjacent(adjacent)
        }
    }

    const openAdjacent = adjacent => {
        adjacent.forEach(space => {
            if (!space.isMine){
                setGameBoard(prevBoard => (
                    prevBoard.map(row => row.map(boardSpace => (
                        space.id === boardSpace.id
                            ? {...boardSpace, isOpen: !boardSpace.isMarked}
                            : boardSpace
                    )))
                ))
            }
            //openSpace(space.id)
        })
    }

    const markSpace = id => {
        setGameBoard(prevBoard => 
            prevBoard.map(row => row.map(space => (
                space.id === id && !space.isOpen
                    ? {...space, isMarked: !space.isMarked}
                    : space
            )))
        )
    }
    
    const generateBoard = () => {
        setGameBoard([]);
        var board = [];
        var mineCoords = generateMines(mines);
    
        for(var h = 1; h <= height; h++) {
            var row = [];
            for(var w = 1; w <= width; w++) {
                row.push({
                    id: `${h}${w}`,
                    row: h,
                    space: w,
                    isMine: false,
                    isOpen: false,
                    isMarked: false,
                    mineCount: 0
                });
            }
            board.push(row);
        }
        mineCoords.forEach(id => {
            board = board.map(row => row.map(space => (
                space.id === id
                    ? {...space, isMine: true}
                    : space
            )))
        });
    
        board = board.map(row => row.map(space => (
            {...space, mineCount: getAdjacentMines(board, space.row, space.space)}
        )))
        console.log(board.map(r => r.map(s => s.isMine ? 'X' : s.mineCount)))
        setGameBoard(board)
        setGameStarted(true)
    }

    const showMines = useCallback(() => {
        let mineSpaces = gameBoard.map(row => row.filter(space => space.isMine)).flat()
        mineSpaces.forEach(space => {
            openSpace(space.id)
        })
        // let updatedBoard = gameBoard.map(row => row.map(space => (
        //     space.isMine
        //         ? {...space, isOpen: true}
        //         : space
        // )))

        // setGameBoard(prevBoard =>
        //     prevBoard.map(row => row.map(space => (
        //         space.isMine
        //             ? {...space, isOpen: true}
        //             : space
        //     )))
        // )
    }, [gameBoard])

    const gameOverProcess = useCallback(() => {
        setGameOver(true)
        showMines()
    }, [showMines])

    return (
        <GameContext.Provider value={{
            width, 
            setWidth,
            height, 
            setHeight,
            mines, 
            setMines,
            gameBoard,
            gameStarted,
            getAdjacentSpaces,
            gameOver,
            openSpaces,
            openSpace,
            markSpace,
            openAdjacent,
            generateBoard,
            gameOverProcess
        }}>
            <GlobalStyles />
            {children}
        </GameContext.Provider>
    )
}