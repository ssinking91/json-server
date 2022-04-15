import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import AsideRepos from "../components/AsideRepos";
import PostSection from "../components/PostSection";
import Pagination from "../components/Pagination";

export default function Search() {
  const searchList = useSelector((state) => state.Search.searchList.list);
  const repoData = useSelector((state) => state.Search.repoData);
  const isLoading = useSelector((state) => state.Search.searchList.isLoading);

  const [isText, setIsText] = useState();

  useEffect(() => {
    const newRepos = repoData.map((el) => el.관광지명);
    setIsText([...newRepos]);
  }, [repoData]);

  // issueData =[{...}, ...]
  const [CurrentData, setCurrentData] = useState([]);

  // Pagination Current Page
  const [currentPage, setCurrentPage] = useState(1);

  // Post 6 per page
  const [postsPerPage] = useState(6);

  // Number of Pages
  const [numOfPages, setNumOfPages] = useState(0);

  useEffect(() => {
    const len = searchList.length;
    // Number of Pages
    const pagesLength = Math.ceil(len / postsPerPage);

    setNumOfPages(pagesLength);

    if (searchList) {
      const pageSearchList = searchList.slice(
        postsPerPage * (currentPage - 1),
        postsPerPage * currentPage - 1 + 1
      );
      setCurrentData([...pageSearchList]);
    }
  }, [currentPage, postsPerPage, searchList]);

  // 클릭된 페이지 활성화
  const changePageNum = useCallback((newIndex) => {
    setCurrentPage(newIndex);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <SearchContainer>
        {repoData && <AsideRepos />}
        <PostSection
          isText={isText}
          CurrentData={CurrentData}
          isLoading={isLoading}
        />
      </SearchContainer>
      {searchList.length > 0 && (
        <Pagination
          currentPage={currentPage}
          numOfPages={numOfPages}
          changePageNum={changePageNum}
        />
      )}
    </div>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
