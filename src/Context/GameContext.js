import React, {createContext, useState, useCallback, useEffect} from 'react'
import gridl from 'gridl'
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

    useEffect(() => {
        if(gridl(gameBoard).find(s => s.isOpen)) {
            let spaces = gameBoard.flat().filter(s => s.isOpen).length
            setOpenSpaces(spaces)
        }
    }, [gameBoard, setOpenSpaces])

    //const getOpenSpaces = useCallback(() => gameBoard.flat().filter(s => s.isOpen).length, [])

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

    const getAdjacentSpaces = (row, space) => gridl(gameBoard).adjacentCellsAt([space - 1, row - 1])

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
                        return space
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
        setGameBoard(prevBoard => 
            prevBoard.map(row => row.map(space => (
                space.isMine
                    ? {...space, isOpen: true}
                    : space
            )))
        )
    }, [])

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