import styled from 'styled-components';

interface CalendarBtnProps {
  selected?: boolean;
  size?: string;
  color?: string;
}
const CalendarBtn = styled.button<CalendarBtnProps>`
  border: none;
  outline: none;
  background-color: ${(props) => (props.selected ? '#3d44db' : 'white')};
  border-radius: 8px;
  fill: currentColor;
  cursor: pointer;
  padding: 8px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &[disabled] {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
  font-size: ${(props) => (props.size ? props.size : '12px')};
  color: ${(props) => (props.color ? props.color : 'black')};
`;

const CalendarHeaderContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const Card = styled.div`
  width: 300px;
  padding: 8px;
  box-shadow: 0 2px 4px -1px #0003, 0 4px 5px #00000024, 0 1px 10px #0000001f;
  background-color: #fff;
  color: #000000de;
`;

const CalendarTd = styled.td`
  text-align: center;
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const CalendarBodyTable = styled.table`
  width: 100%;
  min-height: 228px;
  margin-top: 5%;
  margin-bottom: 5%;
`;

export {
  CalendarBtn,
  CalendarHeaderContainer,
  Card,
  CalendarTd,
  CalendarContainer,
  CalendarBodyTable,
};
