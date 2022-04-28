import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { alreadyModal } from "../redux/modules/Search";

import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import ToastModal from "../components/ToastModal";

export default function Posts({ isText, CurrentData }) {
  const alreadyRepoModal = useSelector(
    (state) => state.Search.alreadyRepoModal
  );
  const isLoading = useSelector((state) => state.Search.searchList.isLoading);

  // Modal
  const [modal, setmodal] = useState(false);
  const [isModalIdx, setModalIdx] = useState(null);

  // Modal 이벤트
  const modalOpen = useCallback(
    (idx) => {
      if (modal) {
        document.body.style.overflow = "unset"; // 스크롤 방지 해제
        setModalIdx(null);
        setmodal(!modal);
      } else {
        document.body.style.overflow = "hidden"; //모달창 띄웠을 때 스크롤 방지
        setModalIdx(idx);
        setmodal(!modal);
      }
    },
    [modal]
  );

  return (
    <>
      <SearchList>
        {isLoading && CurrentData.length === 0 && <Spinner />}
        {!isLoading && CurrentData.length === 0 && (
          <NoSearch>검색 결과가 없습니다.</NoSearch>
        )}
        {CurrentData.length > 0 &&
          CurrentData.map((value, idx) => {
            let hasRepo = isText.includes(value.관광지명);
            return (
              <PostContainer key={idx}>
                <ItemInfoBox>
                  <p>1️⃣ 관광지명 : {value.관광지명}</p>
                  <p>2️⃣ 주차 가능수 : {value.주차가능수}</p>
                  <p>3️⃣ 관리기관 전화번호 : {value.관리기관전화번호}</p>
                  <p>4️⃣ 지정일자 : {value.지정일자}</p>
                </ItemInfoBox>
                <ItemTitleBox onClick={() => modalOpen(idx)} hasRepo={hasRepo}>
                  <p>
                    {hasRepo
                      ? `✨ 이미 저장됨`
                      : `👉 ${value.관광지명} 정보 더보기`}
                  </p>
                </ItemTitleBox>
                {idx === isModalIdx && (
                  <Modal index={idx} modalOpen={modalOpen} info={value} posts />
                )}
              </PostContainer>
            );
          })}
      </SearchList>

      {alreadyRepoModal && (
        <ToastModal
          content="이미 저장 되었습니다!! 🤢"
          alreadyModal={alreadyModal}
        />
      )}
    </>
  );
}

Posts.propTypes = {
  isText: PropTypes.array,
  CurrentData: PropTypes.array,
};

const SearchList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, auto));
  gap: 1rem;
  padding: 3rem 2rem;
  @media screen and (max-width: 1285px) {
    grid-template-columns: repeat(auto-fit, minmax(45%, auto));
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(auto-fit, minmax(100%, auto));
  }
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 30rem;
  padding: 1rem;
  gap: 1rem;
  background-color: white;
  border: 1px solid #c9c9c9;
  border-radius: 10px;
  box-shadow: 0 0 0.5rem 0 #e5e5e5;
  * {
    font: 1.4rem "Noto Sans", "Noto Sans KR", sans-serif;
    font-weight: 700;
    @media screen and (max-width: 992px) {
      font: 1.8rem "Noto Sans", "Noto Sans KR", sans-serif;
      font-weight: 700;
    }
  }
`;

const ItemInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  padding: 0.5rem;
  gap: 1rem;
  border-radius: 5px;
  & > p {
    display: block;
    padding-left: 0.5rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ItemTitleBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  background: ${(props) => (props.hasRepo ? `#00acee` : `#e56e44`)};
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background: ${(props) => (props.hasRepo ? `#a9d9ec` : `peachpuff`)};
    & > p {
      color: #14161a;
    }
  }
  & > p {
    display: block;
    padding-left: 0.5rem;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    color: white;
  }
`;

const NoSearch = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5%;
  font: 1.8rem "Noto Sans", "Noto Sans KR", sans-serif;
  font-weight: 600;
`;
