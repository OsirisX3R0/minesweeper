import styled from "styled-components";
import getCellColor from "./helpers/getCellColor";
import { background, foreground } from "./variables";

//**********//
// CONTROLS //
//**********//

export const ControlGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  gap: 10px;
`;

//********//
// HEADER //
//********//

export const Head = styled.header`
  width: 100%;
  background-color: ${background};
  border-bottom: 1px solid ${foreground};
  padding: 0.75rem 0.5rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  // grid-template-columns: repeat(3, 1fr);
  align-items: center;
  // grid-auto-flow: row;
`;

export const HeadSection = styled.div`
  font-size: 0.6rem;
`;

export const Remaining = styled(HeadSection)``;

export const Clock = styled(HeadSection)`
  text-align: right;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  text-align: center;
  margin: 0;
`;

export const GameHeadContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
`;

//********//
// FOOTER //
//********//

export const Foot = styled.footer`
  width: 100%;
  background-color: ${background};
  border-top: 1px solid ${foreground};
  padding: 0.75rem 0.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ToggleContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  justify-content: center;
  align-items: center;
`;

export const FlagText = styled.span`
  color: ${(props) => (props.selected ? "cornflowerblue" : foreground)};
`;

export const OpenText = styled.span`
  color: ${(props) => (props.selected ? "forestgreen" : foreground)};
`;

export const Container = styled.div`
  width: 100%;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

//*******//
// BOARD //
//*******//

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

export const BoardTable = styled.table``;

export const BoardBody = styled.tbody`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const BoardRow = styled.tr`
  display: flex;
  gap: 5px;
  justify-content: center;
`;

export const Cell = styled.td`
  width: 15px;
  height: 15px;
  border: 1px solid ${foreground};
  border-radius: 4px;
  color: ${(props) => getCellColor(props.cell, props.adjacentFlags)};
  font-weight: bold;
  text-align: center;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GameWonContainer = styled.div`
  width: 100%;
  display: grid;
  text-align: center;
`;

//********//
// INPUTS //
//********//

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

//*********//
// BUTTONS //
//*********//

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
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//***************//
// TOGGLE SWITCH //
//***************//

export const SwitchOuter = styled.label`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
`;

export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

export const SwitchSlider = styled.span`
  border: 1px solid ${foreground};
  border-radius: 34px;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${background};
  -webkit-transition: 0.4s;
  transition: 0.4s;

  input:checked + & {
    background-color: ${background};
  }

  input:focus + & {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + &:before {
    -webkit-transform: translateX(18px);
    -ms-transform: translateX(18px);
    transform: translateX(18px);
  }

  &:before {
    border-radius: 50%;
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 2px;
    bottom: 3px;
    background-color: ${(props) =>
      props.checked ? "forestgreen" : "cornflowerblue"};
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;

//*******//
// UTILS //
//*******//

export const MarginLeft = styled.span`
  display: inline-block;
  margin-left: ${(props) => props.amount};
`;

export const MarginRight = styled.span`
  display: inline-block;
  margin-right: ${(props) => props.amount};
`;
