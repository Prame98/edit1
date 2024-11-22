import React from 'react'
import { Layout } from '../../components/element'
import { styled } from 'styled-components'

const Unpermitted = () => {
  return (
    <Layout>
        <Wrapper>
            <Img src={error} alt="권한없음"/>
            <h1>게시물 작성 권한이 없습니다</h1>
        </Wrapper>
    </Layout>
  )
}

export default Unpermitted;
const Wrapper = styled.section`
    width:100%;
    height:calc(100vh - 117px);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;   
`