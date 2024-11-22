import React from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { createGlobalStyle, styled } from 'styled-components';
import { getMyBoard, getMylikeBoard } from '../../api/boards';
import { userLogout } from '../../api/users';
import { CommonButton, Layout } from '../../components/element';
import Loading from '../statusPage/Loading';
import Error from '../statusPage/Error';
import NullAlert from '../statusPage/NullAlert';
import { SlSettings } from "react-icons/sl";

function MyPageCustomer() {
  const navigate = useNavigate();
  const mileage = sessionStorage.getItem('mileage') || 0;

  // 구매내역 및 관심 목록 불러오기
  const access_token = sessionStorage.getItem('access_token');
  const { isLoading: isLoadingMyBoard, isError: isErrorMyBoard, data: dataMyBoard } = useQuery("getMyBoard", () => getMyBoard(access_token));
  const { isLoading: isLoadingMyLikeBoard, isError: isErrorMyLikeBoard, data: dataMyLikeBoard } = useQuery("getMylikeBoard", () => getMylikeBoard(access_token));

  if (isLoadingMyBoard || isLoadingMyLikeBoard) return <Loading />;
  if (isErrorMyBoard || isErrorMyLikeBoard) return <Error />;

  // 상세페이지 이동
  const goDetail = (boardId, event) => {
    navigate(`/BoardDetail/${boardId}`);
    event.stopPropagation();
  };

  // 로그아웃
  const Logout = () => {
    userLogout();
    navigate('/');
  };

  return (
    <Layout>
      <Setbutton type='button' onClick={() => navigate('/Settings')}><SlSettings /></Setbutton>
      <h1>{sessionStorage.getItem('usernickname')}님의 정보</h1>
      <ButtonContainer>
        <CommonButton size="small" onClick={Logout}>로그아웃</CommonButton>
        <MileageDisplay>마일리지: {mileage}</MileageDisplay>
      </ButtonContainer>
      <TabContainer>
        <TabMenuArea>
          <TabMenu id="sale" className='tabMenu checked'>구매내역</TabMenu>
          <TabMenu id="soldout" className='tabMenu'>관심목록</TabMenu>
          <TabNav className='tabNav'/>
        </TabMenuArea>
        <TabContentsArea>
          <TabSlideArea className='tabContents'>
            <Contents>
              {dataMyBoard && dataMyBoard.length > 0 ? (
                dataMyBoard.map((item) => (
                  <ItemBox key={item.id} onClick={(event) => goDetail(item.id, event)}>
                    <ItemArea>
                      <ImgBox>
                        <img src={item.image} alt={item.title} />
                      </ImgBox>
                      <Info>
                        <h2>{item.title}</h2>
                        <p>{item.address}</p>
                        <b>{item.price}</b>
                      </Info>
                    </ItemArea>
                  </ItemBox>
                ))
              ) : (
                <NullAlert alertMessage='구매한 상품이 없어요'/>
              )}
            </Contents>
            <Contents>
              {dataMyLikeBoard && dataMyLikeBoard.length > 0 ? (
                dataMyLikeBoard.map((item) => (
                  <ItemBox key={item.id} onClick={(event) => goDetail(item.id, event)}>
                    <ItemArea>
                      <ImgBox>
                        <img src={item.image} alt={item.title} />
                      </ImgBox>
                      <Info>
                        <h2>{item.title}</h2>
                        <p>{item.address}</p>
                        <b>{item.price}</b>
                      </Info>
                    </ItemArea>
                  </ItemBox>
                ))
              ) : (
                <NullAlert alertMessage='찜한 상품이 없어요'/>
              )}
            </Contents>
          </TabSlideArea>
        </TabContentsArea>
      </TabContainer>
    </Layout>
  );
}

export default MyPageCustomer;

const Setbutton = styled.button`
  position:relative;
  top:20px;
  left:0;
  border:none;
  background-color:transparent;
  font-size:22px;
  color:#777;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-right: 15px;
`;

const MileageDisplay = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const TabContainer = styled.article`
  width:100%;
  margin-top:30px;
`;

const TabMenuArea = styled.div`
  position:relative;
  width:100%;
  height:50px;
  display:flex;
  border-bottom:1px solid #bdbdbd;
`;

const TabMenu = styled.button`
  width:50%;
  background-color:transparent;
  border:none;
  font-size:18px;
  font-weight:700;
  color:#bdbdbd;
  &.checked{
    color:#222;
  }
`;

const TabNav = styled.div`
  position:absolute;
  bottom:0;
  width:50%;
  height:2px;
  background-color:#333;
  transition:.3s;
`;

const TabContentsArea = styled.div`
  width:100%;
  overflow:hidden;
`;

const TabSlideArea = styled.div`
  width: 200%;
  display:flex;
  transition:.3s;
`;

const Contents = styled.div`
  width:100%;
`;

const ItemBox = styled.div`
  border-bottom:1px solid #ccc;
  cursor:pointer;
`;

const ItemArea = styled.div`
  padding:20px 0;
  display:flex;
  align-items:center;
  width:100%;
`;

const ImgBox = styled.div`
  width:110px;
  height:110px;
  overflow:hidden;
  border-radius:10px;
  & img{
    width:100%;
    height:100%;
  }
`;

const Info = styled.div`
  width:calc(100% - 130px);
  padding-left:20px;
  & h2{
    margin:0;
    font-size:20px;
    font-weight:500;
  }
  & p{
    margin: 0;
    color:#777;
  }
`;
