import React from 'react'
import { styled } from 'styled-components';
import { CommonButton, Input, Layout } from '../components/element'

function Search() {
  return (
    <Layout>
        <StForm>
            <Input type='text' placeholder='검색하실 상품을 입력해주세요'/>
            <CommonButton size='small' type='submit'>검색</CommonButton>
        </StForm>
        <SearchListContainer>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
            <div>여기에 검색 내용이 나옵니다</div>
        </SearchListContainer>
    </Layout>
  )
}

export default Search;

const StForm = styled.form`
    width:100%;
    margin-top:20px;
    & input{
        width:calc(100% - 110px);
        margin-right:10px;
    }
`
const SearchListContainer = styled.section`
    padding-top:30px;
    padding-bottom:30px;
    box-sizing:border-box;
    background-color:beige;
`

