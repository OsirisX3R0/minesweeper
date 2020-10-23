import { useContext, useEffect, useMemo, useState } from "react"
import { GameContext } from "../Context/GameContext"


const useRemainingSpaces = (width, height, mines, openSpaces) => {
    // const {  } = useContext(GameContext)
    const spaces = useMemo(() => (width * height) - mines, [width, height, mines])
    const [remainingSpaces, setRemainingSpaces] = useState('')
    const [emptySpaces] = useState(spaces)
    const [spacesLeft] = useState(spaces)

    useEffect(() => {
        setRemainingSpaces(`${spacesLeft - openSpaces}/${emptySpaces}`)
    }, [spacesLeft, emptySpaces, openSpaces])

    return remainingSpaces
}

export default useRemainingSpaces