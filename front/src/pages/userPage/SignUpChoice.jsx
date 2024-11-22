import React from 'react';
import { styled } from 'styled-components';
import {CommonButton, IntroLayout} from '../../components/element';
import sprout from '../../assets/sprout.webp'
import { useNavigate } from 'react-router-dom';
import { SlArrowLeft } from "react-icons/sl";

function SignUpChoice() {
  const navigate = useNavigate();
  return (
    <IntroLayout>
      <Backbutton type='button' onClick={() => navigate(-1)}><SlArrowLeft /></Backbutton>
        <TextWrap>
          <img src={sprout} alt='소소하게 메인 이미지'/>
          <h1>가입 유형을</h1>
          <h1>선택해 주세요.</h1>
        </TextWrap>
        <ButtonWrap>
          <CommonButton size='large' onClick={() => navigate('/SignUpCustomer')}>손님으로 가입</CommonButton>
          <CommonButton size='large' onClick={() => navigate('/SignUp')}>사장님으로 가입</CommonButton>
        </ButtonWrap>
    </IntroLayout>
  )
}

export default SignUpChoice;

const Backbutton = styled.button`
    position:relative;
    top:20px;
    left:0;
    border:none;
    background-color:transparent;
    font-size:22px;
    color:#777;
`
const TextWrap = styled.div`
  height:calc(100vh - 210px);
  display:flex;
  flex-direction:column;
  justify-content:center;
  text-align:center;

  & h1{
    font-size:28px;
    margin:0;
  }
  & p{
    font-size:18px;
    margin:5px 0;
  }
  &>img{
    width:150px;
    margin:0 auto;
  }
`

const ButtonWrap = styled.div`
  display: flex;           // Flexbox 사용
  flex-direction: column;  // 세로 방향으로 배치
  align-items: center; 
  width:100%;
  & button:first-child{
    margin-bottom:15px;
  }
`