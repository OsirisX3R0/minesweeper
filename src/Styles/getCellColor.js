import { foreground } from "./variables"

const getCellColor = (isMarked, isMine, mineCount) => {
    if (isMarked) {
        return 'goldenrod'
    }
    if (isMine) {
        return 'darkslategray'
    }

    switch(mineCount){
        case 1:
            return 'cornflowerblue'
        case 2:
            return 'forestgreen'
        case 3:
            return 'crimson'
        case 4:
            return 'darken(yellow, 10%)'
        case 5:
            return 'darken(rosybrown, 10%)'
        case 6:
            return 'darken(cyan, 10%)'
        case 7:
            return 'darken(violet, 10%)'
        case 8:
            return 'darken(orangered, 8%)'
        default:
            return foreground
    }
}

export default getCellColor