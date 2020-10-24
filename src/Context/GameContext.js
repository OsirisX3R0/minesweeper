import React, {createContext, useState, useCallback, useEffect} from 'react'
import gridl from 'gridl'
import randomIntFromInterval from '../Utils/randomIntFromInterval';
import { createGlobalStyle } from 'styled-components';
import { background, foreground } from '../Styles/variables';
import useGameTime from '../Hooks/useGameTime'
import useRemainingSpaces from '../Hooks/useRemainingSpaces'

export const GameContext = createContext();

const GlobalStyles = createGlobalStyle`
    body, input, button {
        background-color: ${background};
        color: ${foreground};
        font-family: 'Spartan', sans-serif;
    }
`

export const GameProvider = ({ children }) => {
    const [width, setWidth] = useState(3)
    const [height, setHeight] = useState(3)
    const [mines, setMines] = useState(3)
    const [gameBoard, setGameBoard] = useState([])
    const [gameStarted, setGameStarted] = useState(false)
    const [openSpaces, setOpenSpaces] = useState(0)
    const [gameWon, setGameWon] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [gameTime, stopTime, resetTime] = useGameTime(gameBoard)
    const [remainingSpaces, emptySpaces] = useRemainingSpaces(width, height, mines, openSpaces)

    useEffect(() => {
        if (gameStarted || gridl(gameBoard).find(s => s.isOpen)) {
            let spaces = gameBoard.flat().filter(s => s.isOpen).length
            setOpenSpaces(spaces)
        }
    }, [gameBoard, setOpenSpaces, gameStarted])

    const generateMines = useCallback((max, generatedMines = []) => {
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
    }, [width, height, mines])

    const getAdjacentSpaces = (row, space) => gridl(gameBoard).adjacentCellsAt([space - 1, row - 1])

    const searchBoard = useCallback((board, row, space) => {
        return row > 0 && space > 0 && row <= height && space <= width
            ? board
                .find((thisRow, i) => thisRow && i === row - 1)
                .find(thisSpace => thisSpace.row === row && thisSpace.space === space)
            : { isMine: false }
    }, [width, height])

    const getAdjacentMines = useCallback((board, row, space) => {
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
    }, [searchBoard])

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
    
    const generateBoard = useCallback(() => {
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
    }, [generateMines, getAdjacentMines, height, width, mines])

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
        setGameWon(false)
        setGameOver(true)
        showMines()
    }, [showMines])

    const gameWonProcess = useCallback(() => {
        stopTime()
        setGameOver(false)
        //setGameStarted(false)
        setGameWon(true)
    }, [stopTime])

    useEffect(() => {
        if (remainingSpaces <= 0 && gameStarted)
            gameWonProcess()
    }, [gameWonProcess, remainingSpaces, gameStarted])

    const resetGame = useCallback(() => {
        setGameOver(false)
        setGameWon(false)
        resetTime()
        generateBoard()
    }, [generateBoard, resetTime])

    const goToMenu = useCallback(() => {
        setGameOver(false)
        setGameWon(false)
        setGameStarted(false)
        resetTime()
        setGameBoard([])
    }, [resetTime])

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
            gameWon,
            gameTime,
            remainingSpaces,
            emptySpaces,
            openSpaces,
            openSpace,
            markSpace,
            openAdjacent,
            generateBoard,
            gameOverProcess,
            gameWonProcess,
            resetGame,
            goToMenu
        }}>
            <GlobalStyles />
            {children}
        </GameContext.Provider>
    )
}