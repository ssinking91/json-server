import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// action type
const ALREADY_MODAL = "ALREADY_MODAL";

const ADD_SEARCH_LIST = "ADD_SEARCH_LIST";

const ADD_REPO = "ADD_REPO";
const DELETE_REPO = "DELETE_REPO";

// action creator
const alreadyModal = createAction(ALREADY_MODAL);

const addSearchList = createAction(ADD_SEARCH_LIST, (isLoading, data) => ({
  isLoading,
  data,
}));

const addRepo = createAction(ADD_REPO, (addData) => ({ addData }));
const deleteRepo = createAction(DELETE_REPO, (deletedData) => ({
  deletedData,
}));

// initialState
const initialState = {
  alreadyRepoModal: false,

  searchList: {
    isLoading: false,
    list: [],
  },

  repoData: [],
};

// reducer
export default handleActions(
  {
    [ALREADY_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.alreadyRepoModal = !state.alreadyRepoModal;
      }),

    [ADD_SEARCH_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.searchList.isLoading = action.payload.isLoading;
        draft.searchList.list = [...action.payload.data];
      }),

    [ADD_REPO]: (state, action) =>
      produce(state, (draft) => {
        draft.repoData = [...state.repoData, action.payload.addData];
      }),

    [DELETE_REPO]: (state, action) =>
      produce(state, (draft) => {
        draft.repoData = action.payload.deletedData;
      }),
  },
  initialState
);

export { alreadyModal, addSearchList, addRepo, deleteRepo };
