import React from 'react'
import { styled } from 'styled-components';

function IntroLayout({children}) {
  return (
    <StLayout>
        <StContainer>
            <Wrap>
                {children}
            </Wrap>
        </StContainer>
    </StLayout>
  )
}

export default IntroLayout;

const StLayout = styled.div`
    position:relative;
    background-color:#FFFBF5;
    margin:0;

    @media (max-width: 1400px){
    }

    @media (max-width: 1130px){
    }
`

const StContainer = styled.div`
    width:480px;
    height:100vh;
    overflow-y:scroll;
    margin:0 auto;
    background-color:#fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    &::-webkit-scrollbar{
        width:3px;
    }
    &::-webkit-scrollbar-thumb{
        background-color:#ccc;
    } 
    &::-webkit-scrollbar-track{} 

    @media (max-width: 820px){
        width:100%;
        height:100vh;
    }
`
const Wrap = styled.div`
  width:100%;
  min-height:calc(100vh - 115px);
  padding: 0 20px 70px;
  box-sizing:border-box;
  /* text-align:center; */
`