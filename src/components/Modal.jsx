import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import { addRepo, deleteRepo, alreadyModal } from "../redux/modules/Search";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Modal({ info, index, modalOpen, posts }) {
  const dispatch = useDispatch();

  const searchList = useSelector((state) => state.Search.searchList.list);

  // LocalStorage 커스텀 훅
  const [storage, setLocalStorage] = useLocalStorage("attraction", []);

  // Modal 저장 버튼 클릭시 이벤트
  const handleAddRepo = useCallback(() => {
    const addOneRepo = searchList.filter(
      (value) => value.관광지명 === info.관광지명
    );

    if (storage.length > 0) {
      const newRepos = storage.map((el) => el.관광지명);
      if (newRepos.includes(info.관광지명)) {
        console.log("이미있습니다.");
        dispatch(alreadyModal());
      } else {
        dispatch(addRepo(addOneRepo[0]));
        setLocalStorage([...storage, addOneRepo[0]]);
      }
    } else {
      dispatch(addRepo(addOneRepo[0]));
      setLocalStorage([addOneRepo[0]]);
    }

    modalOpen(null);
  }, [
    dispatch,
    info.관광지명,
    modalOpen,
    searchList,
    setLocalStorage,
    storage,
  ]);

  // Modal 이벤트 : 삭제 시
  const removeBox = useCallback(
    (index) => {
      const deleteBox = storage.filter((_, idx) => idx !== index);
      setLocalStorage(deleteBox);
      dispatch(deleteRepo(deleteBox));
    },
    [dispatch, setLocalStorage, storage]
  );

  // Modal 삭제 버튼 클릭시 이벤트
  const handleRemove = useCallback(() => {
    removeBox(index);
    modalOpen(null);
  }, [index, modalOpen, removeBox]);

  return (
    <>
      <ModalBg onClick={() => modalOpen(null)}></ModalBg>
      <ModalBox>
        <h1>👀 {info.관광지명}</h1>
        <i onClick={() => modalOpen(null)}></i>
        <p>1️⃣ 관광지명 : {info.관광지명} </p>
        <p>2️⃣ 소재지도로명주소 : {info.소재지도로명주소} </p>
        <p>3️⃣ 관광지소개 : {info.관광지소개} </p>
        <p>4️⃣ 주차가능수 : {info.주차가능수} </p>
        <p>5️⃣ 관리기관전화번호 : {info.관리기관전화번호} </p>
        <p>6️⃣ 지정일자 : {info.지정일자} </p>
        <p>7️⃣ 공공편익시설정보 : {info.공공편익시설정보} </p>
        <BtnBox posts={posts ? true : false}>
          {posts ? (
            <button onClick={handleAddRepo}>저장</button>
          ) : (
            <button onClick={handleRemove}>삭제</button>
          )}
        </BtnBox>
      </ModalBox>
    </>
  );
}

Modal.propTypes = {
  info: PropTypes.object,
  index: PropTypes.number,
  modalOpen: PropTypes.func,
  posts: PropTypes.bool,
};

const ModalBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(51, 51, 51, 0.5);
  overflow: hidden;
  z-index: 1;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  gap: 1.5rem;
  top: 50%;
  left: 50%;
  width: 40%;
  padding: 3.5rem 2rem;
  border-radius: 8px;
  margin: auto;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-sizing: border-box; //테두리와 안쪽 여백의 크기도 요소의 크기로 고려
  z-index: 10;
  @media screen and (max-width: 992px) {
    width: 60%;
  }
  @media screen and (max-width: 640px) {
    width: 80%;
  }
  h1 {
    padding: 1.5rem 1rem;
    margin-bottom: 1rem;
    text-align: center;
    font: 2.2rem "Noto Sans", "Noto Sans KR", sans-serif;
    font-weight: 600;
    color: white;
    background: #e56e44;
    border-radius: 8px;
  }
  p {
    width: 100%;
    overflow: hidden;
    word-wrap: break-word;
    font: 1.8rem "Noto Sans", "Noto Sans KR", sans-serif;
    font-weight: 600;
  }
  i {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 10px;
    top: 10px;
    cursor: pointer;
    ::before,
    ::after {
      position: absolute;
      width: 2px;
      height: 25px;
      top: 5px;
      background-color: black;
      content: "";
    }
    ::before {
      right: 15px;
      transform: rotate(45deg);
    }
    ::after {
      right: 15px;
      transform: rotate(-45deg);
    }
  }
`;

const BtnBox = styled.div`
  display: flex;
  button {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 5px;
    margin-top: 2rem;
    color: #fff;
    background-color: ${(props) =>
      props.posts ? `mediumturquoise` : `#EB2D4C`};
    cursor: pointer;
  }
`;
