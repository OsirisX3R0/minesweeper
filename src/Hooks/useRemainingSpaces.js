import { useContext, useEffect, useMemo, useState } from "react"
import { GameContext } from "../Context/GameContext"


const useRemainingSpaces = () => {
    const { width, height, mines, gameBoard } = useContext(GameContext)
    const spaces = useMemo(() => (width * height) - mines, [width, height, mines])
    const [remainingSpaces, setRemainingSpaces] = useState('')
    const [emptySpaces] = useState(spaces)
    const [spacesLeft, setSpacesLeft] = useState(spaces)

    useEffect(() => {
        setRemainingSpaces(`${spacesLeft}/${emptySpaces}`)
    }, [spacesLeft, emptySpaces])

    return remainingSpaces
}

export default useRemainingSpaces