import React from "react";
import styled from "styled-components";
import logo from "../images/logo_goodLife.webp";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <HomeContainer>
      <HomeLogo src={logo} />
      <Section>
        <SectionTitle>
          <span>잘 찾아보세! 👀</span>
        </SectionTitle>
        <SearchBar />
      </Section>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const HomeLogo = styled.img`
  position: fixed;
  top: 30px;
  left: 30px;
  max-width: 120px;
  width: 20vw;
  max-height: 120px;
  height: 20vw;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 4rem;
`;

const SectionTitle = styled.div`
  font-size: 3.2rem;
  text-align: center;
  span {
    white-space: nowrap; //자동 줄바꿈 방지
    font-weight: bold;
  }
`;
