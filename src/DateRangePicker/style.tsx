import styled from 'styled-components';

const InputWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;
const DateInput = styled.input`
  padding: 8px 43px 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  background-color: #fff;
  flex: 1;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const DateIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  padding: 4px;
  cursor: pointer;
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 2;
`;

export { InputWrapper, DateInput, DateIcon, CalendarWrapper };
