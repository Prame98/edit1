import React from 'react'
import { styled } from 'styled-components';
import nullImg from '../../assets/image_02.png';

const NullAlert = ({alertMessage}) => {
  return (
    <Wrapper>
        <img src={nullImg} alt="null이미지" style={{ width: '200px', height: 'auto' }} />
        <p>{alertMessage}</p>
    </Wrapper>
  )
}

export default NullAlert;

const Wrapper = styled.section`
  width:100%;
  padding:170px 0;
  /* background-color:beige; */
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  & p{
    font-size:20px;
    font-weight:600;
  }
`