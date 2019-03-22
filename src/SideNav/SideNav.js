import React, { Component } from 'react';
import styled from 'styled-components';

import Modal from '../Modal/Modal';

const Wrapper = styled.div`
  display: none;

  @media (max-width: 992px) {
    display: block;
  }
`;

const SideNavToggler = styled.button`
  padding: 0;
  border: 0;
  outline: 0;

  background-color: transparent;

  font-size: 32px;
  color: white;

  cursor: pointer;
`;

export default class SideNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNav: false
    };

    this.toggleNavVisibility = this.toggleNavVisibility.bind(this);
  }

  toggleNavVisibility(event) {
    const { showNav } = this.state;

    this.setState({
      showNav: !showNav
    });
  }

  render() {
    const { children, ...otherProps } = this.props;
    const { showNav } = this.state;

    return (
      <Wrapper>
        <SideNavToggler onClick={this.toggleNavVisibility}>
          &#9776;
        </SideNavToggler>

        <Modal
          {...otherProps}
          height="100vh"
          width="75%"
          sliding
          align="left"
          onClose={this.toggleNavVisibility}
          showModal={showNav}
        >
          {children}
        </Modal>
      </Wrapper>
    );
  }
}
