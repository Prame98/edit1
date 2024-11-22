import React from 'react'
import { styled } from 'styled-components';

function Flx({children}) {
  return (
    <StFlx>{children}</StFlx>
  )
}

export default Flx;

const StFlx = styled.div`
    display:flex;
`