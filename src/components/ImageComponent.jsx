// src/components/ImageComponent.jsx
import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  text-align: center;
  margin: 1rem 0;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ImageComponent = ({ src, alt, width, height, ...props }) => {
  return (
    <ImageContainer>
      <StyledImage src={src} alt={alt} width={width} height={height} {...props} />
    </ImageContainer>
  );
};

export default ImageComponent;