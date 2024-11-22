import React from 'react';
import { styled } from 'styled-components';

const ButtonStyle = styled.button`
  width: 80px;
  height: 30px;
  margin-right: 10px;
  border: none;
  background-color: #4B5158;
  border-radius: 5px;
  color: white;
  font-size: 15px;
  font-weight: bold;
`

function StatusButton({ color, children }) {
  return (
    <ButtonStyle color={color}>
      {children}
    </ButtonStyle>
  )
}

export default StatusButton