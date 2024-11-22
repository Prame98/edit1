import React from 'react';
import styled from 'styled-components';

const SetImages = styled.img`
  ${({ width, height }) => `width: ${width}; height: ${height};`}
  ${({ borderradius }) => `border-radius: ${borderradius};`}
`

function Image({ width, height, borderradius, src, alt }) {
  return (
    <SetImages
      width={width}
      height={height}
      borderradius={borderradius}
      src={src}
      alt={alt}
    />
  )
}

export default Image