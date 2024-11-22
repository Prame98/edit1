import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from '../components/element';
import { getAllUsers, getProductsByShop } from '../api/usersMongo'; // 수정된 부분

const { kakao, naver } = window;

function LocationSetting() {
    const navigate = useNavigate();
    const [mapState, setMapState] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [shopInfo, setShopInfo] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // 지도 초기화
        const Container = document.getElementById('map');
        const options = {
            center: new naver.maps.LatLng(37.5665, 126.9780), // 기본 위치 서울
            zoom: 10,
        };
        const map = new naver.maps.Map(Container, options);
        setMapState(map);

        // MySQL에서 가게 정보 가져와 마커 설정
        getAllUsers()
            .then((users) => {  // 기존 shops -> users로 변경
                const newMarkers = users.map((user) => {
                    const markerOptions = {
                        position: new naver.maps.LatLng(user.coordinates_lat, user.coordinates_lng), // 사용자의 좌표
                        map: map,
                        icon: {
                            content: '<div class="marker"></div>',
                            anchor: new naver.maps.Point(12, 12),
                        },
                    };
                    const marker = new naver.maps.Marker(markerOptions);

                    // 마커 클릭 시 가게 정보 로드
                    naver.maps.Event.addListener(marker, 'click', () => {
                        setShopInfo(user);
                        getProductsByShop(user.nick) // 가게 정보로 posts 불러오기
                            .then((posts) => {  // 기존 products -> posts로 변경
                                setProducts(posts);
                            })
                            .catch((error) => {
                                console.error("상품 정보 로드 중 오류 발생:", error);
                                alert("상품 정보를 로드하는 데 실패했습니다.");
                            });
                    });

                    return marker;
                });

                setMarkers(newMarkers);
            })
            .catch((error) => {
                console.error("가게 정보 로드 중 오류 발생:", error);
                alert("가게 정보를 로드하는 데 실패했습니다.");
            });
    }, []);

    // handleSearch 함수 추가
    const handleSearch = () => {
        if (!searchTerm) return;

        // 검색어에 해당하는 가게를 찾음
        const foundShop = markers.find(marker =>
            marker.position.lat().toString().includes(searchTerm) ||
            marker.position.lng().toString().includes(searchTerm)
        );

        if (foundShop) {
            mapState.setCenter(foundShop.getPosition());
            naver.maps.Event.trigger(foundShop, 'click');
        } else {
            alert("해당 상점을 찾을 수 없습니다.");
        }
    };

    // handleCurrentLocation 함수 추가
    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentLat = position.coords.latitude;
                    const currentLng = position.coords.longitude;

                    const newCenter = new naver.maps.LatLng(currentLat, currentLng);
                    mapState.setCenter(newCenter);
                },
                (error) => {
                    console.error("현재 위치를 가져오는 중 오류 발생:", error);
                    alert("현재 위치를 가져오는 데 실패했습니다.");
                }
            );
        } else {
            alert("현재 위치 정보를 사용할 수 없습니다.");
        }
    };

    return (
        <Layout>
            <SearchBar>
                <input
                    type="text"
                    placeholder="상점명 입력"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>검색</button>
                <button onClick={handleCurrentLocation}>현재 위치</button>
            </SearchBar>
            <h1 style={{ fontSize: "25px" }}>동네 지도</h1>
            <MapArea>
                <div id='map' style={{ width: "100%", height: "500px" }}></div>
            </MapArea>

            {shopInfo && (
                <ShopInfo>
                    <h2>상점 정보</h2>
                    <p><strong>상점명:</strong> {shopInfo.nick}</p>
                    <p><strong>영업 시간:</strong> {shopInfo.time}</p>

                    <h3>상품 목록</h3>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <p><strong>상품명:</strong> {product.productName}</p>
                                <p><strong>가격:</strong> {product.price} 원</p>
                                <p><strong>카테고리:</strong> {product.category}</p>
                                <p><strong>판매자:</strong> {product.sellerName}</p>
                            </li>
                        ))}
                    </ul>
                </ShopInfo>
            )}
        </Layout>
    );
}

export default LocationSetting;

// 스타일 정의
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  padding: 8px;
  width: 90%;
  max-width: 500px;

  input {
    width: 60%;
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    &:focus {
      border-color: #5ca771;
      box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.2);
    }
    &::placeholder {
      color: #aaa;
      font-size: 14px;
    }
  }

  button {
    padding: 10px 15px;
    margin-left: 10px;
    border: none;
    background-color: #5ca771;
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #4a9a63;
    }
  }
`;

const MapArea = styled.section`
    width: 100%;
    height: 500px;
    margin-top: 20px;
`;

const ShopInfo = styled.div`
    margin: 20px auto;
    padding: 20px;
    width: 90%;
    max-width: 500px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

    h2, h3 {
        margin-top: 0;
    }

    ul {
        list-style-type: none;
        padding-left: 0;
    }

    li {
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
    }
`;
