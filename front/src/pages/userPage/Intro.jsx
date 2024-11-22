import React from 'react';
import { styled } from 'styled-components';
import {CommonButton, IntroLayout} from '../../components/element';
import sprout from '../../assets/sprout.webp'
import { useNavigate } from 'react-router-dom';

function Intro() {
  const navigate = useNavigate();
  return (
    <IntroLayout>
        <TextWrap>
          <img src={sprout} alt='소소하게 메인 이미지'/>
          <h1>소소한 행복, 소소하게</h1>
          <p>로스 식품 정보부터 예약까지,<br />지금 내 동네를 선택하고 시작해보세요!</p>
        </TextWrap>
        <ButtonWrap>
          <CommonButton size='large' onClick={() => navigate('/Login')}>로그인</CommonButton>
          <CommonButton size='large' onClick={() => navigate('/SignUpChoice')}>회원가입</CommonButton>
        </ButtonWrap>
    </IntroLayout>
  )
}

export default Intro;


const TextWrap = styled.div`
  height:calc(100vh - 180px);
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
  width:100%;
  & button:first-child{
    margin-bottom:15px;
  }
`