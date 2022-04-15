import React from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

import Modal from "./Modal";

export default function ReposBox({
  idx,
  repo,
  isModal,
  modalOpen,
  handleDeleteRepo,
}) {
  return (
    <>
      <RepoContainer onClick={() => modalOpen(idx)}>
        <LeftItem>
          <RepoName>👍{repo.관광지명}</RepoName>
        </LeftItem>
        <RightItem>
          <AddButton className="del_btn" id={idx} onClick={handleDeleteRepo}>
            삭제
          </AddButton>
        </RightItem>
      </RepoContainer>
      {idx === isModal && (
        <Modal info={repo} index={idx} modalOpen={modalOpen} />
      )}
    </>
  );
}

ReposBox.propTypes = {
  repo: PropTypes.object,
  idx: PropTypes.number,
  isModal: PropTypes.number,
  modalOpen: PropTypes.func,
  handleDeleteRepo: PropTypes.func,
};

const RepoContainer = Styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 6.4rem;
    padding: 1.2rem 2.5rem;
    border-radius: 2rem;
    cursor: pointer;

    &:not(:hover) {
    background-color: #e56e44;
    color: #fff;
    transition: all 0.25s ease;
    }

    &:hover {
    background-color: peachpuff;
    color: #14161a;
    transition: all 0.25s ease;

    .del_btn {
        background-color: #EB2D4C;
        color: #fff;
    }
    }

    `;

const LeftItem = Styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RepoName = Styled.p`
    display: block;
    width: 100%;
    font-size: 1.8rem;
    font-weight: 700;
    padding: 0.2rem 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media screen and (max-width: 640px) {
      font: 2.25rem "Noto Sans", "Noto Sans KR", sans-serif;
      font-weight: 700;
    }
`;

const RightItem = Styled(LeftItem)`
  width: 20%;
  height: 100%;
  justify-content: flex-end;
`;

const AddButton = Styled.button`
  width:  100%;
  height: 4rem;
  border-radius: 10px;
  font-size: 2.25rem;
  font-weight: bold;
  color: #fff; 
  background-color: ${(props) => (props.infinite ? `#ccc` : `#00acee`)};
`;
