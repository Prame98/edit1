import React from 'react'
import { styled } from 'styled-components';

function Input({children, ...rest}) {
  return (
    <StInput {...rest}>
        {children}
    </StInput>
  )
}

export default Input;

const StInput = styled.input`
    height:43px;
    border-radius:15px;
    border:1px solid #aaa;
    padding:0 15px;
    box-sizing:border-box;
`