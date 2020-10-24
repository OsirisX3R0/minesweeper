import { useEffect, useMemo, useState } from "react"


const useRemainingSpaces = (width, height, mines, openSpaces) => {
    const spaces = useMemo(() => (width * height) - mines, [width, height, mines])
    const [remainingSpaces, setRemainingSpaces] = useState(0)
    const [emptySpaces] = useState(spaces)
    const [spacesLeft] = useState(spaces)

    useEffect(() => {
        setRemainingSpaces(spacesLeft - openSpaces)
    }, [spacesLeft, openSpaces, emptySpaces])

    return [remainingSpaces, emptySpaces]
}

export default useRemainingSpaces