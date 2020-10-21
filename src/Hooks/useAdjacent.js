import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../Context/GameContext';
//import { getAdjacentCoords, processAdjacent } from '../Utils/adjacentSpaces';

const useAdjacent = (h, w) => {
    const { width, height, gameBoard } = useContext(GameContext)
    const [adjacentSpaces, setAdjacentSpaces] = useState([])

    useEffect(() => {
      let coords = [h, w]
      var widthMinus = w - 1;
      var widthPlus = w + 1;
      var heightMinus = h - 1;
      var heightPlus = h + 1;
      var topLeft = heightMinus > 0 && widthMinus > 0;
      var top = heightMinus > 0;
      var topRight = heightMinus > 0 && widthPlus <= width - 1;
      var left = widthMinus > 0;
      var right = widthPlus <= width - 1;
      var bottomLeft = heightPlus <= height - 1 && widthMinus > 0;
      var bottom = heightPlus <= height - 1;
      var bottomRight = heightPlus <= height - 1 && widthPlus <= width - 1;

      let adjacent = [
        topLeft ? gameBoard[h - 1][w - 1] : null,
        top ? gameBoard[h - 1][w] : null,
        topRight ? gameBoard[h - 1][w + 1] : null,
        left ? gameBoard[h][w - 1] : null,
        right ? gameBoard[h][w + 1] : null,
        bottomLeft ? gameBoard[h + 1][w - 1] : null,
        bottom ? gameBoard[h + 1][w] : null,
        bottomRight ? gameBoard[h + 1][w + 1] : null
      ].filter(a => a !== null && a.id !== coords.toString())

      setAdjacentSpaces(adjacent)
    }, [h, w, width, height, gameBoard])

    return adjacentSpaces
}

  export default useAdjacent;