import React from 'react'
import { Layout } from '../../components/element'
import loading from '../../assets/image_01.png'
import { styled } from 'styled-components'

const Loading = () => {
  return (
    <Layout>
        <Wrapper>
            <Img src={loading} alt="로딩중" style={{ width: '200px', height: 'auto' }}/>
            <h1>로딩중입니다</h1>
        </Wrapper>
    </Layout>
  )
}

export default Loading;

const Wrapper = styled.section`
    width:100%;
    height:calc(100vh - 117px);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;   
`

const Img = styled.img`
    width:200px;
    height:200px;
`
