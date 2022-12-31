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

export const Foot = styled.footer`
  background-color: ${background};
  border-top: 1px solid ${foreground};
  padding-top: 0.5rem;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-around;
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

export const Select = styled.select`
  border: 1px solid ${foreground};
  border-radius: 5px;
  padding: 0.5rem;
`;

export const Button = styled.button`
  background-color: ${(props) => (props.fill ? background : foreground)};
  color: ${(props) => (props.fill ? foreground : background)};
  border: 1px solid ${foreground};
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  border-radius: 5px;
  padding: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.fill ? foreground : background)};
    color: ${(props) => (props.fill ? background : foreground)};
    cursor: pointer;
  }
`;

export const StartButton = styled(Button)`
  width: 100%;
  grid-column: 1 / -1;
`;

export const ToggleButton = styled(Button)`
  width: 75px;
  height: 75px;
  border-bottom: 1px solid ${(props) => (props.fill ? background : foreground)};
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
  color: ${(props) => getCellColor(props.cell, props.adjacentFlags)};
  font-weight: bold;
  text-align: center;
  padding: 1.5rem;
`;

export const GameWonContainer = styled.div`
  width: 100%;
  display: grid;
  text-align: center;
`;

export const SwitchOuter = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  // &:checked + .slider {
  //   background-color: #2196F3;
  // }

  // &:focus + .slider {
  //   box-shadow: 0 0 1px #2196F3;
  // }

  // &:checked + .slider:before {
  //   -webkit-transform: translateX(26px);
  //   -ms-transform: translateX(26px);
  //   transform: translateX(26px);
  // }
`;

export const SwitchSlider = styled.span`
  border-radius: 34px;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;

  &:before {
    border-radius: 50%;
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;
