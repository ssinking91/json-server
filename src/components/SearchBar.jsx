import React, { useRef, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { addSearchList } from "../redux/modules/Search";

import useGetQs from "../hooks/useGetQs";

export default function SearchBar() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { target } = useGetQs("target");

  const searchInput = useRef(null);

  // Query String으로 router
  const navigateToSearch = useCallback(() => {
    let targetValue = searchInput.current.value;
    navigation(`/search?target=${targetValue}`);
  }, [navigation]);

  // Enter키 기능
  const handleSearchKeyUp = useCallback(
    (e) => {
      if (e.key === "Enter") {
        navigateToSearch();
        searchInput.current.value = null;
      }
    },
    [navigateToSearch]
  );

  // api 통신
  const [isLoading, setIsLoading] = useState(false);

  const fetchProdData = useCallback(async () => {
    const url = `http://localhost:3001/records?_sort=관광지명&_order=ASC`;
    dispatch(addSearchList(true, []));
    setIsLoading(true);
    try {
      const { data, status, statusText } = await axios.get(url);
      if (status >= 400) {
        alert(`잘못된 요청입니다.🤢 statusText: ${statusText}`);
      } else if (status >= 500) {
        alert(`서버 에러입니다.🤢 statusText: ${statusText}`);
      }

      let newTarget;

      // 문자열의 모든 공백 제거하기
      if (target) newTarget = target.replace(/(\s*)/g, "");

      if (newTarget) {
        if (newTarget.includes(",")) {
          const targetArr = newTarget.split(",");

          let newData = [];

          for (let dataOne of data) {
            for (let targetOne of targetArr) {
              dataOne.관광지명.includes(targetOne) &&
                !newData.includes(dataOne) &&
                newData.push(dataOne);
            }
          }

          dispatch(addSearchList(false, newData));
          setIsLoading(false);
        } else {
          const newData = data.filter((value) => {
            return value.관광지명.includes(newTarget);
          });
          dispatch(addSearchList(false, newData));
          setIsLoading(false);
        }
      } else {
        dispatch(addSearchList(false, data));
        setIsLoading(false);
      }
    } catch (e) {
      alert(`에러가 발생했습니다. 잠시후 다시 실행해 주세요.🤢 `);
      console.error(e);
      setIsLoading(false);
    }
  }, [dispatch, target]);

  useEffect(() => {
    fetchProdData();
  }, [fetchProdData]);

  return (
    <>
      <SearchBarContainer>
        <SearchBarItem>
          <SearchBarInput
            type="text"
            placeholder="🔎 전체 관광지는 검색을 눌러주세요!✨"
            ref={searchInput}
            onKeyPress={handleSearchKeyUp}
            disabled={isLoading}
          />
          <SearchBarButton onClick={navigateToSearch}>검색</SearchBarButton>
        </SearchBarItem>
      </SearchBarContainer>
    </>
  );
}

const SearchBarContainer = styled.div`
  display: flex;
  min-width: 300px;
  width: 40vw;
`;

const SearchBarItem = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto;
  margin-bottom: 1.5rem;
  border-radius: 2rem;
  box-shadow: 0 0 1.5rem 0 #c8c8c8;
`;

const SearchBarInput = styled.input`
  width: calc(100% - 75px);
  height: 40px;
  font-size: 1.4rem;
  padding: 0 2.5rem;
  border-radius: 20px 0 0 20px;
  border: none;
  ::placeholder {
    color: #cccccc;
    font-size: 1.4rem;
    font-weight: 700;
  }
`;

const SearchBarButton = styled.button`
  width: 75px;
  background: #e56e44;
  color: white;
  border-radius: 0 20px 20px 0;
  font-size: 1.4rem;
  &:hover {
    cursor: pointer;
    background: peachpuff;
  }
`;
