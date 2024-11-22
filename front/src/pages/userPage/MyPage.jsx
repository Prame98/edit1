import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { createGlobalStyle, styled } from 'styled-components';
import { deleteBoard, getDetailBoard, getMyBoard, getMylikeBoard, putBoardReservation } from '../../api/boards';
import { userLogout } from '../../api/users';
import { CommonButton, Layout } from '../../components/element';
import Loading from '../statusPage/Loading';
import Error from '../statusPage/Error';
import NullAlert from '../statusPage/NullAlert';
import { SlSettings } from "react-icons/sl";
import ReservationList from "../ReservationList";

function MyPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 탭메뉴 관련 js
    const tabMenuHandler = (e) => {
        const targetMenu = e.target;
        const allMenus = document.querySelectorAll('.tabMenu');
        const tabNav = document.querySelector('.tabNav');
        const tabContents = document.querySelector('.tabContents');
        const index = Array.from(allMenus).indexOf(targetMenu);
        const navDistance = index * 100;
        const contentsDistance = index * 50;
        
        allMenus.forEach((menu) => {
            menu.classList.remove('checked');
        });

        targetMenu.classList.add('checked');

        tabNav.style.transform = `translateX(${navDistance}%)`;
        tabContents.style.transform = `translateX(-${contentsDistance}%)`;
    };

    // 게시물 불러오기
    const access_token = sessionStorage.getItem('access_token');

    const { isLoading, isError, data, refetch } = useQuery("getMyBoard", () => getMyBoard(access_token));/*
    const { isLoading: isLoadingMyLikeBoard, isError: isErrorMyLikeBoard, data: dataMyLikeBoard, refetch: refetchMyBoard } = useQuery("getMylikeBoard", () => getMylikeBoard(access_token));*/
          // 여기서 dataMyLikeBoard도 가져오기 때문에..
          // localhost:3000/MyPage에선, '/api/mypage/myBoard'랑 '/api/like' 둘다 연결이 된 상태여야함



    // 상품 상태 변경 시 mutation 발생
    const reservationMutation = useMutation(putBoardReservation,{
        onSuccess: (response) => {
            queryClient.invalidateQueries("getMyBoard");
            // queryClient.invalidateQueries("getMyLikeBoard");
            alert('상품 예약이 완료되었습니다.')
            console.log('response',response);
        }
    });

    // 상품 삭제 시 mutation
    const deleteBoardMutation = useMutation(deleteBoard,{
        onSuccess: (response) => {
            queryClient.invalidateQueries("getMyBoard");
            // queryClient.invalidateQueries("getMyLikeBoard");
            alert('상품 삭제가 완료되었습니다.')
            console.log('response',response);
        }
    })

    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <Error />
    }

    // 상세페이지 이동
    const goDetail = (boardId, event) => {
        navigate(`/BoardDetail/${boardId}`);
        event.stopPropagation();
    };
    
    // 상품 게시글 삭제
    const BoardDelete = (event, boardId) => {
        deleteBoardMutation.mutate(boardId);
        event.stopPropagation();
    };

    // 상품 거래완료 처리
    const BoardReservation = (event, boardId) => {
        reservationMutation.mutate(boardId);
        event.stopPropagation();
    };

    // 로그아웃
    const Logout = () => {
        userLogout();
        navigate('/')
    };

    console.log('data',data);
    // console.log('dataMyLikeBoard',dataMyLikeBoard);

  return (
    <Layout>
        <Setbutton type='button' onClick={() => navigate('/Settings')}><SlSettings /></Setbutton>
        <h1>{sessionStorage.getItem('usernickname')}님의 정보</h1>
        <CommonButton size="small" onClick={() => navigate('/BoardWrite')} style={{marginRight:'13px'}}>글쓰기</CommonButton>
        {/* <CommonButton size="small" onClick={() => navigate('/editNickname')} style={{marginRight:'13px'}}>닉네임 변경</CommonButton> */}
        <CommonButton size="small" onClick={Logout}>로그아웃</CommonButton>
 
        <TabContainer>
            <TabMenuArea>
                <TabMenu id="sale" className='tabMenu checked' onClick={tabMenuHandler}>판매중</TabMenu>
                <TabMenu id="reservation" className='tabMenu' onClick={tabMenuHandler}>예약내역</TabMenu>
                <TabNav className='tabNav'/>
            </TabMenuArea>
            <TabContentsArea>
                <TabSlideArea className='tabContents'>
                    <Contents>
                        {/* 판매중 영역 */}
                        {data === undefined || data === null ? (
                            <NullAlert alertMessage="판매중인 상품이 없어요" />
                        ) : data.filter((item) => item.status === true).length === 0 ? (
                            <NullAlert alertMessage="판매중인 상품이 없어요" />
                        ) : (
                            data
                            .filter((item) => item.status === true)
                            .map((board) => (
                                <ItemBox key={board.id} onClick={() => goDetail(board.id)}>
                                <ItemArea>
                                    <ImgBox>
                                    <img
                                        src={`http://localhost:8001${board.image}`}
                                        alt="상품 이미지"
                                    />
                                    </ImgBox>
                                    <Info>
                                    <h2>{board.title}</h2>
                                    <p>{board.nickname}</p>
                                    <b>
                                        {Number(
                                        board.original_price * (1 - board.discount_rate / 100)
                                        ).toLocaleString()}
                                        원
                                    </b>
                                    </Info>
                                </ItemArea>
                                </ItemBox>
                            ))
                        )}
                    </Contents>
                    <Contents>
                        {/* 예약내역 영역 */}
                        {data === undefined || data.length === 0 ? (
                            <NullAlert alertMessage='손님이 예약한 상품이 없어요'/>
                        ) : (
                            <ReservationList />
                        )}
                    </Contents>
                </TabSlideArea>
            </TabContentsArea>
        </TabContainer>
    </Layout>
  )
}

export default MyPage;

const Setbutton = styled.button`
    position:relative;
    top:20px;
    left:0;
    border:none;
    background-color:transparent;
    font-size:22px;
    color:#777;
`

const TabContainer = styled.article`
    width:100%;
    margin-top:30px;
`
const TabMenuArea = styled.div`
    position:relative;
    width:100%;
    height:50px;
    display:flex;
    border-bottom:1px solid #bdbdbd;
`
const TabMenu = styled.button`
    width:50%; /* 탭을 반으로 나누기 위해 50%로 설정 */
    background-color:transparent;
    border:none;
    font-size:18px;
    font-weight:700;
    color:#bdbdbd;
    &.checked{
        color:#222;
    }
`
const TabNav = styled.div`
    position:absolute;
    bottom:0;
    width:50%; /* 네비게이션 바도 탭에 맞게 50% */
    height:2px;
    background-color:#333;
    transition:.3s;
`
const TabContentsArea = styled.div`
    width:100%;
    overflow:hidden;
`
const TabSlideArea = styled.div`
    width: 200%; /* 두 탭의 내용만 담으므로 200%로 설정 */
    display:flex;
    transition:.3s;
`
const Contents = styled.div`
     width:100%; /* 탭 컨텐츠 영역도 50%로 설정 */
    /* background-color:beige; */
    &>div{
        width:100%;
    }
`
const ItemBox = styled.div`
    border-bottom:1px solid #ccc;
    cursor:pointer;
`
const ItemArea = styled.div`
    padding:20px 0;
    display:flex;
    align-items:center;
    width:100%;
`
const ImgBox = styled.div`
    width:110px;
    height:110px;
    overflow:hidden;
    border-radius:10px;
    & img{
        width:100%;
        height:100%;
    }
`
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
`
const ButtonWrap = styled.div`
    width:100%;
    & button{
        width:50%;
        height:50px;
        background-color:#fff;
        border:none;
        border-top:1px solid #ccc;
        font-size:17px;
        font-weight:500;
    }
    & button:first-child{
        border-right:1px solid #ccc;
    }
`
