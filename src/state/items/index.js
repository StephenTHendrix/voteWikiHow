import { databaseActions } from "../../services/firebase/database";

const GET_ITEMS_START = "items/GET_ITEMS_START";
const GET_ITEMS_SUCCESS = "items/GET_ITEMS_SUCCESS";
const GET_SCROLLINDEX_START = "items/GET_SCROLLINDEX_START";
const GET_SCROLLINDEX_SUCCESS = "items/GET_SCROLLINDEX_SUCCESS";
const VOTE_UP = "items/VOTE_UP";
const VOTE_DOWN = "items/VOTE_DOWN";

const handleGetItemsStart = () => ({
  type: GET_ITEMS_START
});

const handleGetItemsSuccess = items => ({
  type: GET_ITEMS_SUCCESS,
  payload: items
});

const handleGetScrollIndexStart = () => ({
  type: GET_SCROLLINDEX_START
});

const handleGetscrollIndexSuccess = scrollIndex => ({
  type: GET_SCROLLINDEX_SUCCESS,
  payload: scrollIndex
});

const handleVoteUp = documentId => ({
  type: VOTE_UP,
  payload: documentId
});

const handleVoteDown = documentId => ({
  type: VOTE_DOWN,
  payload: documentId
});

const getItems = () => {
  return async dispatch => {
    dispatch(handleGetItemsStart());
    const results = await databaseActions.getItems();
    dispatch(handleGetItemsSuccess(results));
  };
};

const getScrollIndex = () => {
  return async dispatch => {
    dispatch(handleGetScrollIndexStart());
    const results = await databaseActions.getScrollIndex();
    dispatch(handleGetscrollIndexSuccess(results));
  };
};

const voteUp = documentId => {
  return dispatch => {
    dispatch(handleVoteUp(documentId));
    databaseActions.voteUp(documentId);
  };
};

const voteDown = documentId => {
  return dispatch => {
    dispatch(handleVoteDown(documentId));
    databaseActions.voteDown(documentId);
  };
};

export const actions = {
  voteUp,
  voteDown,
  getItems,
  getScrollIndex
};

const initialState = {
  items: [],
  loading: false,
  loadingScrollIndex: false,
  scrollIndex: 1,
  hasVoted: false
};

export const reducer = (state = initialState, action) => {
  let items;
  let itemIndex;
  let item;
  let updatedItem;
  // let scrollIndex;

  switch (action.type) {
    case GET_ITEMS_START:
      return {
        ...state,
        loading: true
      };
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };
      case GET_SCROLLINDEX_START:
      return {
        ...state,
        loadingScrollIndex: true
      };
    case GET_SCROLLINDEX_SUCCESS:
      return {
        ...state,
        loadingScrollIndex: false,
        scrollIndex: action.payload
      };
    case VOTE_UP:
      items = [...state.items];
      items.forEach((item, index) => {
        if (item.id === action.payload) {
          itemIndex = index;
        }
      });
      item = state.items.find(item => item.id === action.payload);
      updatedItem = {
        ...item,
        voteCount: item.voteCount + 1
      };
      items[itemIndex] = updatedItem;

      return {
        ...state,
        items,
        hasVoted: true
      };
    case VOTE_DOWN:
      items = state.items.map(item =>
        item.id === action.payload
          ? {
              ...item,
              voteCount: item.voteCount - 1
            }
          : item
      );

      return {
        ...state,
        items,
        hasVoted: true
      };
    default:
      return state;
  }
};
