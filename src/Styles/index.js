import styled from "styled-components";
import getCellColor from "./helpers/getCellColor";
import { background, foreground } from "./variables";

export const ControlGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const Head = styled.header`
  background-color: ${background};
  border-bottom: 1px solid ${foreground};
  margin-bottom: 25px;
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  grid-auto-flow: row;
`;

export const Remaining = styled.div``;

export const Title = styled.h1`
  text-align: center;
`;

export const Clock = styled.div`
  text-align: right;
`;

export const Container = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: grid;
  align-items: center;
  justify-content: center;
`;

export const GameHeadContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
`;

export const SpacesLeft = styled.div``;

export const Time = styled.div``;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(255px, 1fr));
  grid-gap: 1rem;
`;

export const Item = styled.div`
  display: grid;
  grid-column: ${(props) => (props.full ? "1 / -1" : "span 1")};
`;

export const Label = styled.label`
  font-size: 0.75rem;
`;

export const Input = styled.input`
  border: 1px solid ${foreground};
  border-radius: 5px;
  padding: 0.5rem;
`;

export const Button = styled.button`
  background-color: ${(props) => (props.fill ? foreground : background)};
  color: ${(props) => (props.fill ? background : foreground)};
  border: 1px solid ${(props) => (props.fill ? background : foreground)};
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  border-radius: 5px;
  padding: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.fill ? background : foreground)};
    color: ${(props) => (props.fill ? foreground : background)};
    cursor: pointer;
  }
`;

export const StartButton = styled(Button)`
  width: 100%;
  grid-column: 1 / -1;
`;

export const BoardTable = styled.table`
  // max-width: 800px;
  // margin: auto;
`;

export const BoardBody = styled.tbody`
  /* display: grid;
    grid-template-columns: repeat(25px, 1fr);
    gap: .25rem; */
`;

export const BoardRow = styled.tr``;

export const Cell = styled.td`
  width: 25px;
  height: 25px;
  border: 1px solid ${foreground};
  border-radius: 4px;
  color: ${(props) => getCellColor(props.cell, props.allAdjacentFlagged)};
  font-weight: bold;
  text-align: center;
  padding: 1.5rem;
`;

export const GameWonContainer = styled.div`
  width: 100%;
  display: grid;
  text-align: center;
`;
