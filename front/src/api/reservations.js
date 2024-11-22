import { instance } from './axios';

// 예약 내역 조회
export const getReservations = async () => {
  return instance.get('/api/reservations')
    .then((response) => {
      return response.data.data.map((reservation) => ({
        id: reservation.id,
        boardId: reservation.boardId,
        productName: reservation.productName,
        customerName: reservation.customerName,
        price: reservation.price,
        image: reservation.image,
        status: reservation.status,
      }));
    })
    .catch((error) => {
      console.error('예약 내역 조회 실패:', error.response.data);
      throw error;
    });
};
