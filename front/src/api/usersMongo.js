import { instance } from './axios';

// 모든 사용자 정보(가게) 가져오기
export const getAllUsers = () => {
    return instance.get('/api/users/all')
        .then(response => response.data)
        .catch(error => {
            console.error("가게 정보 로드 중 오류 발생:", error);
            throw error;
        });
};

// 특정 가게의 상품 정보 가져오기
export const getProductsByShop = (shopId) => {
    return instance.get(`/api/users/products?shopId=${shopId}`)
        .then(response => response.data)
        .catch(error => {
            console.error("상품 정보 로드 중 오류 발생:", error);
            throw error;
        });
};
