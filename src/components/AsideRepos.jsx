import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styled from "styled-components";

import { deleteRepo } from "../redux/modules/Search";

import RepoBox from "./RepoBox";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { localStorageKey } from "../utilities/localStorageKey";

export default function RepoList() {
  const dispatch = useDispatch();

  const repoData = useSelector((state) => state.Search.repoData);

  // LocalStorage 커스텀 훅
  const [storage, setLocalStorage] = useLocalStorage(localStorageKey, []);

  useEffect(() => {
    if (storage) {
      dispatch(deleteRepo(storage));
    }
  }, [dispatch, storage]);

  const handleDeleteRepo = useCallback(
    (e) => {
      e.stopPropagation();

      const target = e.target.id;
      let leftData = repoData.filter((_, idx) => Number(target) !== idx);

      dispatch(deleteRepo(leftData));
      setLocalStorage(leftData);
      setModalIdx(null);
    },
    [repoData, dispatch, setLocalStorage]
  );

  const [modal, setmodal] = useState(false);
  const [isModal, setModalIdx] = useState(null);

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
      {repoData.length > 0 && (
        <AsideContainer>
          <h1>잘 찾아보세! 👀</h1>
          {repoData.length > 0 &&
            repoData.map((repo, idx) => {
              return (
                <RepoBox
                  key={idx}
                  idx={idx}
                  repo={repo}
                  isModal={isModal}
                  modalOpen={modalOpen}
                  handleDeleteRepo={handleDeleteRepo}
                />
              );
            })}
        </AsideContainer>
      )}
    </>
  );
}

const AsideContainer = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 320px;
  height: 50vh;
  gap:1rem;
  padding: 1rem 1rem 1rem;
  overflow: scroll;
  @media screen and (max-width: 1285px) {
    height: 70vh;
  }
  @media screen and (max-width: 992px) {
    height: 90vh;
  }
  @media screen and (max-width: 640px) {
    min-width: 360px;
    width: 70%;
    height: fit-content;
  }
  & > h1{
    font: 3rem "Noto Sans", "Noto Sans KR", sans-serif;
    font-weight: 900;
  }
`;
