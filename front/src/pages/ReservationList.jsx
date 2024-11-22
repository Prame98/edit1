import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Layout, Image } from '../components/element';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getReservations } from '../api/reservations';
import Loading from './statusPage/Loading';
import Error from './statusPage/Error';


function ReservationList() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);

  // 예약 내역 조회
  const { data, isLoading, isError } = useQuery('getReservations', getReservations, {
    onSuccess: (data) => {
      setReservations(data);
    },
  });

  if (isLoading) {
    return <Loading />
  }
  
  if (isError) {
      return <Error />
  }

  // 예약 상세 페이지로 이동
  const goToBoardDetail = (boardId) => {
    navigate(`/BoardDetail/${boardId}`);
  };

  return (
    <Layout>
      <ReservationListWrapper>
        {reservations.length === 0 ? (
          <div>예약된 상품이 없습니다.</div>
        ) : (
          reservations.map((reservation) => (
            <ReservationItem key={reservation.id} onClick={() => goToBoardDetail(reservation.boardId)}>
              <Image
                width="110px"
                height="110px"
                borderradius="10px"
                src={reservation.image}
                alt={reservation.productName}
              />
              <ReservationInfo>
                <h2>{reservation.productName}</h2>
                <p>예약자: {reservation.customerName}</p>
                <p>가격: {reservation.price.toLocaleString()}원</p>
                <p>상태: {reservation.status}</p>
              </ReservationInfo>
            </ReservationItem>
          ))
        )}
      </ReservationListWrapper>
    </Layout>
  );
}

export default ReservationList;

// 스타일 정의
const ReservationListWrapper = styled.div`
  margin-top: 20px;
`;

const ReservationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const ReservationInfo = styled.div`
  margin-left: 20px;

  h2 {
    font-size: 18px;
    margin: 0;
    font-weight: bold;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
    color: #666;
  }
`;
