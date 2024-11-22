import React, { useState } from 'react'
import { styled } from 'styled-components';
import Flx from './Flx';
import { AiOutlineHome, AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { IoPersonOutline, IoPerson } from "react-icons/io5";
import { BsChatDots, BsChatDotsFill } from "react-icons/bs";
import { HiLocationMarker, HiOutlineLocationMarker } from "react-icons/hi";
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const [icon, setIcon] = useState(AiOutlineHome);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleIcon = (newIcon, url) => {
    setIcon((prevIcon) => prevIcon === newIcon ? AiOutlineHome : newIcon);
    navigate(url);
  };

  return (
    <StNavbar>
      <Flx>
        <button type='button' onClick={() => toggleIcon(AiOutlineHome, '/BoardList')}>{location.pathname === '/BoardList'  ? <AiFillHome /> : <AiOutlineHome />}</button>
        <button type='button' onClick={() => toggleIcon(AiOutlineSearch, '/LocationSetting')}>{location.pathname === '/LocationSetting' ? <HiLocationMarker /> : <HiOutlineLocationMarker />}</button>
        {/* <button type='button' onClick={() => toggleIcon(BsChatDots, '/ChatList')}>{location.pathname === '/ChatList' ?  <BsChatDotsFill /> : <BsChatDots />}</button> */}
        <button type='button' onClick={() => toggleIcon(IoPersonOutline, '/MyPage')}>{location.pathname === '/MyPage' ? <IoPerson /> : <IoPersonOutline />}</button>
      </Flx>
    </StNavbar>
  )
}

export default Navbar;

const StNavbar = styled.div`
    position:fixed;
    bottom:0;
    width:480px;
    height:60px;
    background-color:#fff;
    box-shadow: rgba(0, 0, 0, 0.1)  0 -3px 4px -1px ;

    @media (max-width: 820px){
        width:100%;
    }

    & button{
      width:33%;
      border:none;
      background-color:transparent;
      font-size:27px;
      line-height:60px;
    }
`
