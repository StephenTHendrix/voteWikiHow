import { databaseActions } from "../../services/firebase/database";


/* Action Types */
const GET_ITEMS_START = "items/GET_ITEMS_START";
const GET_ITEMS_SUCCESS = "items/GET_ITEMS_SUCCESS";
const VOTE_UP = "items/VOTE_UP";
const VOTE_DOWN = "items/VOTE_DOWN";
const SET_ITEM_INDEX = "items/SET_ITEM_INDEX";

/* Action Creators */
const handleGetItemsStart = () => ({
  type: GET_ITEMS_START
});

const handleGetItemsSuccess = items => ({
  type: GET_ITEMS_SUCCESS,
  payload: items
});

const handleVoteUp = documentId => ({
  type: VOTE_UP,
  payload: documentId
});

const handleVoteDown = documentId => ({
  type: VOTE_DOWN,
  payload: documentId
});

const handleSetItemIndex = itemIndex => ({
  type: SET_ITEM_INDEX,
  payload: itemIndex
});

/* Actions */
const getItems = () => {
  return async dispatch => {
    dispatch(handleGetItemsStart());
    const results = await databaseActions.getItems();
    dispatch(handleGetItemsSuccess(results));
  };
};

const voteUp = documentId => {
  databaseActions.voteUp(documentId);
  return handleVoteUp(documentId);
};

const voteDown = documentId => {
  databaseActions.voteDown(documentId);
  return handleVoteDown(documentId);
};

const setItemIndex = (itemIndex) => handleSetItemIndex(itemIndex);

export const actions = {
  voteUp,
  voteDown,
  getItems,
  setItemIndex
};

const initialState = {
  items: [],
  loading: false,
  itemIndex: 0
};

export const reducer = (state = initialState, action) => {
  let items;
  let itemIndex;
  let item;
  let updatedItem;

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
    case SET_ITEM_INDEX:
      return {
        ...state,
        itemIndex: action.payload
      }
    default:
      return state;
  }
};
