import React from 'react';
import styled from 'styled-components';

import getComputedStyleAttributeValue from '../utils/getComputedStyleAttributeValue';

const NavbarComponent = styled.nav`
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    ${({ fixed: isFixed, fixTo }) =>
			isFixed
				? `position: fixed;
						${fixTo === 'bottom' ? 'bottom: 0' : 'top: 0'};
						left: 0;
					`
				: ''}

    height: ${({ height }) => getComputedStyleAttributeValue(height, '10vh')};
    width: 100%;
    box-shadow: 0 5px 15px 0 hsla(0, 0%, 0%, 0.5);

    background-color: ${({ backgroundColor, theme }) =>
			getComputedStyleAttributeValue(backgroundColor, theme.primaryColor)};

    color: ${({ color }) => getComputedStyleAttributeValue(color, 'white')}
    z-index: ${({ zIndex }) => getComputedStyleAttributeValue(zIndex, '9999')}
    
    @media (max-width: 992px) {
        height: ${({ height }) =>
					getComputedStyleAttributeValue(height, '10vmax')};
    }
`;

function Navbar({ ...props }) {
	return <NavbarComponent {...props} />;
}

export default Navbar;
