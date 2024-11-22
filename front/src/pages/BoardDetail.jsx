import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Layout, Image, StatusButton } from '../components/element';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
// import userDefaultImg from '../assets/user_default_image.jpg';
import { useQuery, useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBoardDetail, setLikeStatus, addToPurchaseHistory } from '../api/boards';

function BoardDetail() {
  const currentBoardId = useLocation().pathname.slice(13);
  const [currentLike, setCurrentLike] = useState(null);

  // * 게시글 상세 조회
  const { data, refetch } = useQuery(['getBoardDetail', currentBoardId], () => getBoardDetail(currentBoardId), {
    staleTime: Infinity,
    onSuccess: (data) => {
      setCurrentLike(data.likeStatus);
    },
  });

  const navigate = useNavigate();

  // * 게시글 찜하기 useMutation
  const setLikeStatusMutation = useMutation(setLikeStatus, {
    onSuccess: (response) => {
      if (response === '게시판 찜 하기 성공') {
        alert('해당 게시글을 관심 목록에 추가하였습니다.');
        setCurrentLike(true);
      } else {
        alert('해당 게시글을 관심 목록에서 제거하였습니다.');
        setCurrentLike(false);
      }
    }
  });

  // * 찜 버튼 클릭 핸들러
  const onBoardClickLike = () => {
    setLikeStatusMutation.mutate(currentBoardId);
  };

  // * 구매내역에 추가하는 useMutation
  const addToPurchaseMutation = useMutation(addToPurchaseHistory, {
    onSuccess: () => {
      alert('구매내역에 추가되었습니다.');
      navigate('/MyPageCustomer');
    }
  });

  // * 예약하기 버튼 클릭 핸들러
  const onReserve = () => {
    addToPurchaseMutation.mutate(currentBoardId);
    navigate(`/ReserveNotice`);
  };

  return (
    <Layout>
      {data && (
        <ContentSection>
          <Image
            width={'440px'}
            height={'440px'}
            borderradius={'5px'}
            src={data.image}
            alt={'상품 이미지'}
          />
          <UserDiv>
            <UserInfoDiv>
              {/* <Image
                width={'40px'}
                height={'40px'}
                borderradius={'50%'}
                src={userDefaultImg}
                alt={'유저 프로필 이미지'}
              /> */}
              <div>
                <DetailH2>{data.nickName}</DetailH2>
                {/* 기본 주소와 상세 주소를 함께 표시 */}
                <DetailH3>
                  {data.address} {data.region4depthName}
                </DetailH3>
              </div>
            </UserInfoDiv>
          </UserDiv>
          <DetailDiv>
            <DetailH1>{data.title}</DetailH1>
            <DetailContent>{data.content.replace(/<br>/g, '\n')}</DetailContent>
          </DetailDiv>
          <DetailNav>
            {data.status && <StatusButton color={'black'}>예약완료</StatusButton>}
            <DetailH1>{Number(data.price).toLocaleString()}원</DetailH1>
            <div>
              {currentLike ? (
                <AiFillHeart onClick={onBoardClickLike} />
              ) : (
                <AiOutlineHeart onClick={onBoardClickLike} />
              )}
            </div>
            <ReserveButton onClick={onReserve}>예약하기</ReserveButton>
          </DetailNav>
        </ContentSection>
      )}
    </Layout>
  );
}

export default BoardDetail;


const ContentSection = styled.section`
  margin-top: 20px;
;
`
const UserDiv = styled.div`
  padding: 15px 5px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;
;`

const UserInfoDiv = styled.div`
  display: flex;
  align-items: center;
  & img {
    margin-right: 10px;
  }
;`

const DetailDiv = styled.div`
  margin-top: 15px;
  margin-left: 5px;
;
`
const DetailH1 = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin: 0;
;`

const DetailH2 = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
;`

const DetailH3 = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 300;
  color: grey;
;`

const DetailContent = styled.p`
  margin: 25px 0 90px 0;
;`

const DetailNav = styled.nav`
  height: 70px;
  width: 440px;
  display: flex;
  position: fixed;
  align-items: center;
  bottom: 60px;
  background-color: #FFFFFF;
  border-top: 1px solid lightgrey;
  & div {
    width: 40px;
    height: 40px;
    padding-right: 5px;
    padding-left: 15px;
    font-size: 30px;
    font-weight: bold;
    color: #ED8C26;
    border-left: 2px solid lightgrey;
    cursor: pointer;
  }
  & div:last-child {
    margin-left: auto;
  }
;`

const ReserveButton = styled.button`
  margin-left: 10px;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  `