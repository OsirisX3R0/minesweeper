import React, { createContext, useRef, useState } from "react";
import { createGlobalStyle } from "styled-components";
import {
  generateMineArray,
  Board,
  BoardStateEnum,
  CellStateEnum,
  CellFlagEnum,
} from "minesweeper";

import { background, foreground } from "../Styles/variables";
import { Container } from "../Styles";
// import useBoard from "../Hooks/useBoard";

export const GameContext = createContext();

const GlobalStyles = createGlobalStyle`
    body, input, button {
        background-color: ${background};
        color: ${foreground};
        font-family: 'Spartan', sans-serif;
    }
`;

// const optionReducer = (state, action) => {
//     switch(action.type) {
//         case 'set_rows':
//             return {...state, width: action.rows}
//         case 'set_cols':
//             return {...state, width: action.cols}
//         case 'set_mines':
//             return {...state, width: action.mines}
//         default:
//             return state
//     }
// }

export const GameProvider = ({ children }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [mines, setMines] = useState(3);
  let mineArray = useRef(null);
  let board = useRef(null);
  const [grid, setGrid] = useState([]);
  const [boardState, setBoardState] = useState([]);
  //   let [options, dispatchOptions] = useReducer(optionReducer, {
  //         rows: 10,
  //         cols: 10,
  //         mines: 15,
  //       });

  const generateBoard = () => {
    mineArray.current = generateMineArray({ rows, cols, mines });
    board.current = new Board(mineArray.current);
    setGrid([...board.current.grid()]);
    setBoardState(board.current.state());
  };
  // let mineArray = useRef(generateMineArray(options.current));
  // let board = useRef(new Board(mineArray.current));
  //   const [grid, setGrid] = useState(board.current.grid());
  //   const [boardState, setBoardState] = useState(board.current.state());

  const renderGrid = () => {
    setGrid([...board.current.grid()]);
  };

  const getBoardState = () => {
    setBoardState(board.current.state());
  };

  const openCell = (x, y) => {
    board.current.openCell(x, y);
    renderGrid();
    getBoardState();
  };

  const cycleCellFlag = (x, y) => {
    board.current.cycleCellFlag(x, y);
    renderGrid();
    getBoardState();
  };

  const displayValue = (cell) => {
    if (boardState === BoardStateEnum.LOST && cell.isMine) return "X";
    if (cell.state === CellStateEnum.OPEN) {
      if (cell.isMine) return "X";
      else return cell.numAdjacentMines || "O";
    } else {
      switch (cell.flag) {
        case CellFlagEnum.EXCLAMATION:
          return "!";
        case CellFlagEnum.QUESTION:
          return "?";
        default:
          return "";
      }
    }
  };

  //   const {
  //     grid,
  //     rows,
  //     cols,
  //     mines,
  //     boardState,
  //     openCell,
  //     cycleCellFlag,
  //     displayValue,
  //   } = useBoard({
  //     rows: 10,
  //     cols: 10,
  //     mines: 15,
  //   });
  // const [width, setWidth] = useState(3)
  // const [height, setHeight] = useState(3)
  // const [mines, setMines] = useState(3)
  // const [gameBoard, setGameBoard] = useState([])
  // const [gameStarted, setGameStarted] = useState(false)
  // const [openSpaces, setOpenSpaces] = useState(0)
  // const [gameWon, setGameWon] = useState(false)
  // const [gameOver, setGameOver] = useState(false)
  // const [gameTime, stopTime, resetTime] = useGameTime(gameBoard)
  // const [remainingSpaces, emptySpaces] = useRemainingSpaces(width, height, mines, openSpaces)

  // useEffect(() => {
  //     if (gameStarted || gridl(gameBoard).find(s => s.isOpen)) {
  //         let spaces = gameBoard.flat().filter(s => s.isOpen).length
  //         setOpenSpaces(spaces)
  //     }
  // }, [gameBoard, setOpenSpaces, gameStarted])

  // const generateMines = useCallback((max, generatedMines = []) => {
  //     for(var i = 1; i <= max; i++) {
  //         generatedMines.push(
  //             `${randomIntFromInterval(1, height)}${randomIntFromInterval(1, width)}`
  //         );
  //     }
  //     generatedMines = generatedMines
  //         .filter((mine, index) => generatedMines.indexOf(mine) === index)
  //     if(generatedMines.length < max) {
  //         generateMines(mines - generatedMines.length, generatedMines)
  //     }
  //     return generatedMines;
  // }, [width, height, mines])

  // const getAdjacentSpaces = (row, space) => gridl(gameBoard).adjacentCellsAt([space - 1, row - 1])

  // const searchBoard = useCallback((board, row, space) => {
  //     return row > 0 && space > 0 && row <= height && space <= width
  //         ? board
  //             .find((thisRow, i) => thisRow && i === row - 1)
  //             .find(thisSpace => thisSpace.row === row && thisSpace.space === space)
  //         : { isMine: false }
  // }, [width, height])

  // const getAdjacentMines = useCallback((board, row, space) => {
  //     let topLeft = searchBoard(board, row - 1, space - 1)
  //     let top = searchBoard(board, row - 1, space)
  //     let topRight = searchBoard(board, row - 1, space + 1)
  //     let left = searchBoard(board, row, space - 1)
  //     let right = searchBoard(board, row, space + 1)
  //     let bottomLeft = searchBoard(board, row + 1, space - 1)
  //     let bottom = searchBoard(board, row + 1, space)
  //     let bottomRight = searchBoard(board, row + 1, space + 1)

  //     return [
  //         topLeft.isMine,
  //         top.isMine,
  //         topRight.isMine,
  //         left.isMine,
  //         right.isMine,
  //         bottomLeft.isMine,
  //         bottom.isMine,
  //         bottomRight.isMine
  //     ].filter(s => s).length
  // }, [searchBoard])

  // const openSpace = (id, adjacent = []) => {
  //     let mineCount;
  //     let isMine;
  //     setGameBoard(prevBoard =>
  //         prevBoard.map(row => row.map(space => {
  //             if (space.id === id && !space.isOpen) {
  //                 isMine = false
  //                 mineCount = space.mineCount
  //                 if (space.isMine) {
  //                     isMine = space.isMine
  //                     gameOverProcess()
  //                     return space
  //                 }

  //                 return {...space, isOpen: true, isMarked: false}
  //             } else {
  //                 return space
  //             }
  //         }))
  //     )
  //     if (mineCount === 0 && !isMine && adjacent.length > 0) {
  //         openAdjacent(adjacent)
  //     }
  // }

  // const openAdjacent = adjacent => {
  //     adjacent.forEach(space => {
  //         if (!space.isMine){
  //             setGameBoard(prevBoard => (
  //                 prevBoard.map(row => row.map(boardSpace => (
  //                     space.id === boardSpace.id
  //                         ? {...boardSpace, isOpen: !boardSpace.isMarked}
  //                         : boardSpace
  //                 )))
  //             ))
  //         }
  //     })
  // }

  // const markSpace = id => {
  //     setGameBoard(prevBoard =>
  //         prevBoard.map(row => row.map(space => (
  //             space.id === id && !space.isOpen
  //                 ? {...space, isMarked: !space.isMarked}
  //                 : space
  //         )))
  //     )
  // }

  // const generateBoard = useCallback(() => {
  //     setGameBoard([]);
  //     var board = [];
  //     var mineCoords = generateMines(mines);

  //     for(var h = 1; h <= height; h++) {
  //         var row = [];
  //         for(var w = 1; w <= width; w++) {
  //             row.push({
  //                 id: `${h}${w}`,
  //                 row: h,
  //                 space: w,
  //                 isMine: false,
  //                 isOpen: false,
  //                 isMarked: false,
  //                 mineCount: 0
  //             });
  //         }
  //         board.push(row);
  //     }
  //     mineCoords.forEach(id => {
  //         board = board.map(row => row.map(space => (
  //             space.id === id
  //                 ? {...space, isMine: true}
  //                 : space
  //         )))
  //     });

  //     board = board.map(row => row.map(space => (
  //         {...space, mineCount: getAdjacentMines(board, space.row, space.space)}
  //     )))
  //     console.log(board.map(r => r.map(s => s.isMine ? 'X' : s.mineCount)))
  //     setGameBoard(board)
  //     setGameStarted(true)
  // }, [generateMines, getAdjacentMines, height, width, mines])

  // const showMines = useCallback(() => {
  //     setGameBoard(prevBoard =>
  //         prevBoard.map(row => row.map(space => (
  //             space.isMine
  //                 ? {...space, isOpen: true}
  //                 : space
  //         )))
  //     )
  // }, [])

  // const gameOverProcess = useCallback(() => {
  //     setGameWon(false)
  //     setGameOver(true)
  //     showMines()
  // }, [showMines])

  // const gameWonProcess = useCallback(() => {
  //     stopTime()
  //     setGameOver(false)
  //     //setGameStarted(false)
  //     setGameWon(true)
  // }, [stopTime])

  // useEffect(() => {
  //     if (remainingSpaces <= 0 && gameStarted)
  //         gameWonProcess()
  // }, [gameWonProcess, remainingSpaces, gameStarted])

  // const resetGame = useCallback(() => {
  //     setGameOver(false)
  //     setGameWon(false)
  //     resetTime()
  //     generateBoard()
  // }, [generateBoard, resetTime])

  // const goToMenu = useCallback(() => {
  //     setGameOver(false)
  //     setGameWon(false)
  //     setGameStarted(false)
  //     resetTime()
  //     setGameBoard([])
  // }, [resetTime])

  return (
    <GameContext.Provider
      value={{
        grid,
        setRows,
        rows,
        setCols,
        cols,
        setMines,
        mines,
        generateBoard,
        boardState,
        openCell,
        cycleCellFlag,
        displayValue,
      }}
    >
      <GlobalStyles />
      <Container>{children}</Container>
    </GameContext.Provider>
  );
};
