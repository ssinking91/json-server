import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import PropTypes from "prop-types";

import logo from "../images/logo_goodLife.webp";
import SearchBar from "./SearchBar";

export default function Header({ isLoading }) {
  const navigation = useNavigate();
  return (
    <HeaderContainer>
      <ImageItem>
        <HeaderImage
          src={logo}
          onClick={() => {
            navigation("/");
          }}
        />
      </ImageItem>
      <SearchBar isLoading={isLoading} />
    </HeaderContainer>
  );
}

Header.propTypes = {
  loading: PropTypes.bool,
};

const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 3rem 1rem 1rem;
  background: white;

  @media screen and (max-width: 550px) {
    flex-direction: column;
  }
`;

const ImageItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vh;

  @media screen and (max-width: 550px) {
    margin-bottom: 20px;
  }
`;

const HeaderImage = styled.img`
  &:hover {
    cursor: pointer;
  }
`;
