import  styled from "styled-components"
import getCellColor from "./helpers/getCellColor"
import { background, foreground } from "./variables"

export const Header = styled.h1``

export const Container = styled.div`
    width: 100%;
    margin-top: 2rem;
    display: grid;
    align-items: center;
    justify-content: center;
`

export const GameHeadContainer = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
`

export const SpacesLeft = styled.div``

export const Time = styled.div``

export const Grid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(255px, 1fr));
    grid-gap: 1rem;
`

export const Item = styled.div`
    display: grid;
`

export const Label = styled.label`
    font-size: .75rem;
`

export const Input = styled.input`
    border: 1px solid ${foreground};
    border-radius: 5px;
    padding: .5rem;
`

export const Button = styled.button`
    background-color: ${background};
    color: ${foreground};
    border: 1px solid ${foreground};
    border-radius: 5px;
    padding: .5rem;
    transition: all .2s;

    &:hover {
        background-color: ${foreground};
        color: ${background};
        cursor: pointer;
    }
`

export const BoardContainer = styled.div`
    // max-width: 800px;
    // margin: auto;
`

export const BoardBody = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.width}, 1fr);
    gap: .25rem;
`

export const BoardRow = styled.tr``

export const Cell = styled.td`
    width: 25px;
    height: 25px;
    border: 1px solid ${foreground};
    border-radius: 4px;
    color: ${props => getCellColor(props.space.isMarked, props.space.isMine, props.space.mineCount)};
    font-weight: bold;
    text-align: center;
    padding: 1.5rem;
`