import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { SlArrowLeft } from "react-icons/sl";
import { Input, CommonButton, Flx, IntroLayout } from '../../components/element';
import { useMutation } from 'react-query';
import { getIdChk, userSignup } from '../../api/users';

function SignUpCustomer() {
    // 회원가입에서 필요한 Hook연결하기
    const navigate = useNavigate();

    // Input창 저장용 state
    const [input, setInput] = useState({
        userId: '',
        password: '',
        pwConfirm: '',
        nickname: '',
    });

    // Input창 작성용 onChangeHandler
    const onChangeInputHandler = (e) => {
        const { id, value } = e.target;
        setInput({
            ...input,
            [id]: value,
        });
    };

    // ID 중복 확인 핸들러
    const onIdChkHandler = (e) => {
        e.preventDefault();
        getIdChk(input.userId);
    };

    // 가입하기 버튼 클릭 이벤트핸들러
    const onSubmitJoinHandler = (e) => {
        e.preventDefault();
        const userInfo = {
            userId: input.userId,
            password: input.password,
            nickname: input.nickname,
        };
        const userType = 'guest'; // 손님 유저 타입으로 설정
        userSignup(userInfo, userType);
        navigate('/Login');
    };

    return (
        <IntroLayout>
            <Backbutton type='button' onClick={() => navigate(-1)}><SlArrowLeft /></Backbutton>
            <h1 style={{marginTop:"40px",marginBottom:"0px"}}>회원가입</h1>
            <StForm>
                <div>
                    <Flx>
                        <label htmlFor='nickname'>닉네임</label>
                        <Input 
                            type="text" 
                            value={input.nickname} 
                            id='nickname' 
                            placeholder='3~10글자 사이 영문' 
                            onChange={onChangeInputHandler}
                        />
                        {
                            /^[a-zA-Z]{3,10}$/.test(input.nickname) ? null : 
                            <p className='alertText'>5~10글자 사이 영문을 사용하세요.</p>
                        }
                    </Flx>

                    <Flx>
                        <label htmlFor='userId'>아이디</label>
                        <StyledInput 
                            type="text" 
                            value={input.userId} 
                            id='userId' 
                            placeholder='5~10글자 사이 영문 소문자,숫자' 
                            onChange={onChangeInputHandler}
                        />
                        <CommonButton size='small' onClick={(e) => onIdChkHandler(e)}>중복확인</CommonButton>
                        {
                            /^[a-z0-9]{8,15}$/.test(input.userId) ? null : 
                            <p className='alertText'>8~15글자 사이 영문 소문자,숫자를 사용하세요.</p>
                        }
                    </Flx>
                    
                    <Flx>
                        <label htmlFor='password'>패스워드</label>
                        <Input 
                            type="password" 
                            value={input.password} 
                            id='password' 
                            placeholder='8~15글자 사이 영문,숫자,특수문자' 
                            onChange={onChangeInputHandler}
                        />
                        {
                            /^[a-zA-Z0-9!@#$%^&*()\-_=+{};:,.<>?[\]\\/]{8,15}$/.test(input.password) ? null : 
                            <p className='alertText'>8~15글자 사이 영문,숫자,특수문자를 사용하세요.</p>
                        }
                    </Flx>

                    <Flx>
                        <label htmlFor='pwConfirm'>중복확인</label>
                        <Input 
                            type="password" 
                            value={input.pwConfirm} 
                            id='pwConfirm' 
                            placeholder='비밀번호 확인을 위해 한번 더 입력해주세요' 
                            onChange={onChangeInputHandler}
                        />
                        {
                            input.password === input.pwConfirm ? null : 
                            <p className='alertText'>비밀번호가 일치하지 않습니다.</p>
                        }
                    </Flx>
                </div>
                <CommonButton onClick={(e) => onSubmitJoinHandler(e)} size='large'>가입하기</CommonButton>
            </StForm>
        </IntroLayout>
    );
}

export default SignUpCustomer;

const Backbutton = styled.button`
    position: relative;
    top: 20px;
    left: 0;
    border: none;
    background-color: transparent;
    font-size: 22px;
    color: #777;
`;

const StForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 190px);
    padding-top: 30px;
    box-sizing: border-box;
    &>div>div {
        position: relative;
    }

    & label {
        display: inline-block;
        width: 65px;
        line-height: 43px;
        font-weight: 500;
    }
    & .alertText {
        position: absolute;
        top: 45px;
        display: inline-block;
        color: #f00;
        margin: 3px 0 25px;
        transform: translateX(70px);
        font-size: 0.8rem;
    }
    & input {
        display: inline-block;
        width: calc(100% - 65px);
        margin-bottom: 50px;
    }
`;

const StyledInput = styled(Input)`
    display: inline-block;
    width: calc(100% - 168px) !important;
    margin-right: 8px;
`;
