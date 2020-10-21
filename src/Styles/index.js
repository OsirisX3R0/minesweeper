import  styled from "styled-components"
import { background, foreground } from "./variables"

export const Container = styled.div`
    width: 100%;
    margin-top: 2rem;
    display: grid;
    align-items: center;
    justify-content: center;
`

export const GameHead = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
`

export const Grid = styled.div`
    width: 100%;
    display: grid;
    grid-auto-flow: column;
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

export const Button = styled(Input)`
    transition: all .2s;

    &:hover {
        background-color: ${foreground};
        color: ${background};
        cursor: pointer;
    }
`

export const BoardTable = styled.table``

export const BoardBody = styled.tbody``

export const Cell = styled.td`
    width: 25px;
    height: 25px;
    border: 1px solid ${foreground};
    border-radius: 4px;
    color: ${foreground};
    font-weight: bold;
    text-align: center;
    padding: 1.5rem;
`