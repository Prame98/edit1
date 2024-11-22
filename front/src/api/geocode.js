// src/api/geocode.js
import axios from 'axios';

// 주소를 위도와 경도로 변환하는 함수
export const geocodeAddress = async (address) => {
    const API_KEY = 'YOUR_KAKAO_API_KEY';
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;
    
    try {
        const response = await axios.get(url, {
            headers: { Authorization: `KakaoAK ${API_KEY}` }
        });
        const { documents } = response.data;
        if (documents.length > 0) {
            const { y: lat, x: lng } = documents[0];
            return { lat, lng };
        } else {
            throw new Error('No results found');
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
};
