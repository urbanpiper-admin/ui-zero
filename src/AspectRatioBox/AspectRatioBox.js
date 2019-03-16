import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  :before {
    content: '';
    width: 1px;
    margin-left: -1px;
    float: left;
    height: 0;
    padding-top: ${({ ratio }) => 100 / ratio + '%'};
  }

  :after {
    content: '';
    display: table;
    clear: both;
  }
`;

const FixedARBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const AspectRatioBox = props => {
  const { ratio, ...otherProps } = props;
  return (
    <Container ratio={ratio || 1} {...otherProps}>
      <FixedARBox>{props.children}</FixedARBox>
    </Container>
  );
};

export default AspectRatioBox;
