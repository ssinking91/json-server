import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Posts from "./Posts";

export default function PostSection({ isText, CurrentData, isLoading }) {
  return (
    <PostsWrapper>
      <Posts isText={isText} CurrentData={CurrentData} isLoading={isLoading} />
    </PostsWrapper>
  );
}

PostSection.propTypes = {
  isText: PropTypes.array,
  CurrentData: PropTypes.array,
  isLoading: PropTypes.bool,
};

const PostsWrapper = styled.div`
  min-width: 320px;
  width: calc(100% - 320px);
  @media screen and (max-width: 640px) {
    min-width: 360px;
    width: 80%;
  }
`;
