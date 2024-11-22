import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Layout, Image, StatusButton } from '../components/element';
import { SlArrowDown } from 'react-icons/sl';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { getBoards } from '../api/boards';
import bread from '../assets/bread.png'
import ricecake from '../assets/ricecake.png'
import sidedish from '../assets/sidedish2.png'
import martcart from '../assets/mart-cart.png'
import etc from '../assets/sidedish.png'

function BoardList() {
  const [boardData, setBoardData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 단일 카테고리 상태
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const navigate = useNavigate();

  // 페이지가 마운트될 때 게시글 리스트를 조회하도록 설정
  useEffect(() => {
    getBoardList();
  }, []); 

  // 카테고리 목록 정의
  const categories = [
    { id: 1, name: '빵', image: bread },
    { id: 2, name: '떡', image: ricecake },
    { id: 3, name: '반찬', image: sidedish },
    { id: 4, name: '마트', image: martcart },
    { id: 5, name: '기타', image: etc },
  ];

   // 게시글 리스트 조회 함수, categoryId를 인수로 받음
   const getBoardList = (categoryId = null) => {
    const setPage = {
      page: 0,
      size: 100,
      sort: ["createdAt,DESC"], 
    };
    getBoardListMutation.mutate({ setPage, categoryId });
  };

  // 게시글 리스트 조회 useMutation
  const getBoardListMutation = useMutation(
    ({ setPage, categoryId }) => getBoards(setPage, categoryId), // categoryId 전달
    {
      onSuccess: (response) => {
        setBoardData(response);
      },
    }
  );

useEffect(() => {
  getBoardList(); // 처음 렌더링 시 모든 게시글 조회
}, []);

  // 상세 페이지로 이동
  const setPageChange = (boardId) => {
    navigate(`/BoardDetail/${boardId}`);
  };

  // 카테고리 선택 핸들러
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory((prevCategory) =>
        prevCategory === categoryId ? null : categoryId
    );
    getBoardList(categoryId); // 선택한 카테고리 ID로 게시글 조회
};


  // 선택된 카테고리에 따라 필터링된 게시글 목록
  const filteredBoardData = selectedCategory
  ? boardData && boardData.filter((board) => board.categoryId === selectedCategory)
  : boardData;

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/BoardListShop/${searchTerm}`);
    }
  };

  return (
    <Layout>
      {/* 검색 바 */}
      <SearchBar>
        <input 
          type="text"
          placeholder="상점명 입력"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch} // Enter 키 눌렀을 때 검색
        />
      </SearchBar>

      {/* 카테고리 섹션 */}
      <CategorySection>
        {categories && categories.map((category) => (
          <CategoryItem
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            isSelected={selectedCategory === category.id}
          >
            <CategoryImage>
              <img src={category.image} alt={category.name} />
            </CategoryImage>
            <span>{category.name}</span>
          </CategoryItem>
        ))}
      </CategorySection>

      {/* 게시물 리스트 섹션 */} 
      <ListSection>
        {filteredBoardData && filteredBoardData.map((board) => (
          <ListOneDiv onClick={() => setPageChange(board.id)} key={board.id}>
            <Image
              width="130px"
              height="130px"
              borderradius="10px"
              src={`http://localhost:8001${board.image}`}   // 백엔드에서 읽어오는 이미지 경로가 필요
              alt="상품 이미지"
            />
            <ListInfoDiv>
              <ListTitleH1>{board.title}</ListTitleH1>
              <ListDetailH3>
                <span>{board.nickname}</span> {/* 상점명(사장님의 닉네임) */}
              </ListDetailH3>
              <ListPriceH2>
                {board.status && <StatusButton color="black">예약완료</StatusButton>}
                {Number(board.price).toLocaleString()}원
              </ListPriceH2>
            </ListInfoDiv>
          </ListOneDiv>
        ))}
      </ListSection>

      {/* 글쓰기 버튼 */}
      <WriteButton>
        <Link to="/BoardWrite">+</Link>
      </WriteButton>
    </Layout>
  );
}

export default BoardList;

// 스타일 정의
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  padding: 8px;
  width: 90%;
  max-width: 500px; /* 검색 바와 카테고리 섹션의 너비를 같게 설정 */

  input {
    width: 100%;
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
`;

const CategorySection = styled.div`
  display: flex;
  overflow-x: hidden;
  padding: 10px 0;
  margin-bottom: 20px;
  justify-content: space-around;
  width: 90%;
  max-width: 500px; /* 검색 바와 동일한 너비로 설정 */
  margin: 0 auto;
`;

const CategoryItem = styled.div`
  flex: 1;
  max-width: 70px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: 0 5px;
  background-color: ${({ isSelected }) => (isSelected ? '#14AD6D' : '#fff')}; /* 선택 시 색상 변경 */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  }

  span {
    margin-top: 4px;
    font-size: 12px;
    color: #333;
  }
`;

const CategoryImage = styled.div`
  width: 45px;
  height: 45px;
  
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 80%;
    height: auto;
    object-fit: cover;
  }
`;

const ListSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const ListOneDiv = styled.div`
  padding: 15px 5px;
  display: flex;
  border-bottom: 1px solid lightgrey;
  cursor: pointer;
`;

const ListInfoDiv = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ListTitleH1 = styled.h1`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

const ListPriceH2 = styled.h2`
  margin: 0;
  & span {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }
`;

const ListDetailH3 = styled.h3`
  margin: 10px 0 7px 0;
  font-size: 15px;
  font-weight: 300;
  color: grey;
`;

const WriteButton = styled.button`
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 75px;
  right: 50%;
  transform: translateX(370%);
  border: none;
  border-radius: 50%;
  background-color: #14AD6D;
  color: white;
  font-size: 30px;
  transition: all 0.03s ease-out;
  box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.25);
  &:hover {
    background-color: #029B5D;
  }
  @media (max-width: 820px) {
    right: 25px;
    transform: initial;
  }
`;

