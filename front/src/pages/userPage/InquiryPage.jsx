import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IntroLayout } from '../../components/element';
import { BsCameraFill } from 'react-icons/bs';
//import { SlArrowLeft } from "react-icons/sl";

const InquiryPage = () => {
  const [text, setText] = useState('');
  const [imageCount, setImageCount] = useState(0);
  const maxTextLength = 1000;
  const maxImageCount = 10;

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length + imageCount > maxImageCount) {
      alert(`이미지는 최대 ${maxImageCount}장까지 업로드 가능합니다.`);
    } else {
      setImageCount(imageCount + files.length);
    }
  };

  const navigate = useNavigate();
  const handleInquiry = () => {
    alert('문의가 접수되었습니다.');
    navigate(-1);
  };

  return (
    <IntroLayout>
        <Header>
          <BackButton onClick={() => navigate(-1)}>&lt;</BackButton>
          <Title>문의하기</Title>
        </Header>
        <Instruction>
          만약, 문제가 지속적으로 해결되지 않는 경우 자세한 내용으로 문의를 남겨주세요.
        </Instruction>
        <TextInput
          placeholder="여기에 내용을 적어주세요 :)"
          value={text}
          onChange={handleTextChange}
          maxLength={maxTextLength}
        />
        <TextCount>{`${text.length}/${maxTextLength}`}</TextCount>
        <ImageUpload>
          <ImageLabel>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <BsCameraFill></BsCameraFill>
          </ImageLabel>
          <ImageCount>{`${imageCount}/${maxImageCount}`}</ImageCount>
        </ImageUpload>
        <Divider />
        <Notice>
          <p>고객센터 운영시간은 10:00 ~ 19:00 예요.</p>
          <p>답변에는 시간이 소요됩니다. 조금만 기다려주세요 :)</p>
          <p>문의의 내용을 자세하게 남겨주시면 빠른 답변에 도움이 됩니다.</p>
          <p>
            산업안전보건법에 따라 고객응대 근로자 보호조치를 하고 있으며 모든 문의는 기록으로 남습니다.
          </p>
          <p>
            문의하기 버튼을 누르시면{' '}
            <a href="/privacy-policy">개인정보 수집 이용동의서</a>에 동의하신 것으로 간주합니다.
          </p>
        </Notice>
        <InquiryButton onClick={handleInquiry}>문의하기</InquiryButton>
    </IntroLayout>
  );
};

export default InquiryPage;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  border: none;
  background: none;
  color: #000000;
  font-size: 24px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-left: 155px;
  
  flex: 1;
  color: #000000;
`;

const Instruction = styled.p`
  margin: 20px 0;
  font-size: 16px;
  color: #555555;
`;

const TextInput = styled.textarea`
  width: 95%;
  height: 150px;
  padding: 10px;
  font-size: 16px;
  color: #000000;
  background-color: #f7f7f7;
  border: 1px solid #cccccc;
  border-radius: 5px;
  resize: none;
  outline: none;
`;

const TextCount = styled.div`
  text-align: right;
  font-size: 14px;
  color: #555555;
  margin-top: 5px;
`;

const ImageUpload = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const ImageLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #f7f7f7;
  border-radius: 5px;
  cursor: pointer;
`;

const ImageCount = styled.span`
  margin-left: 10px;
  font-size: 14px;
  color: #555555;
`;

const Divider = styled.hr`
  margin: 20px 0;
  border: none;
  border-top: 1px solid #cccccc;
`;

const Notice = styled.div`
  font-size: 14px;
  color: #555555;
  line-height: 1.6;
  margin-bottom: 20px;

  p {
    margin: 5px 0;
  }

  a {
    color: #1a73e8;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const InquiryButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  color: #ffffff;
  background-color: #333333;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #555555;
  }
`;
