import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actions as itemsActions } from "./state/items";

export const App = () => {
  const dispatch = useDispatch();
  const voteUp = (documentId) => dispatch(itemsActions.voteUp(documentId));
  const voteDown = (documentId) => dispatch(itemsActions.voteDown(documentId));
  const items = useSelector(({ items }) => items.items);
  const scrollIndex = useSelector(( { items } ) => items.scrollIndex);
  const item = items[scrollIndex];

  // items.length && console.log(item)

  console.log(scrollIndex)
  console.log(items)

  useEffect(() => {
    const getItems = () => dispatch(itemsActions.getItems());
    getItems();
  }, [dispatch]);

  useEffect(() => {
    const getScrollIndex = () => dispatch(itemsActions.getScrollIndex());
    getScrollIndex();
  }, [dispatch]);

  return (
    <div>
      {items.length &&
        // items.map(item => (
          <div key={item.id}>
            <img src={item.imageUrl} alt="wiki" />
            <div>{item.caption}</div>
            <div onClick={() => voteUp(item.id)}>^</div>
            <div onClick={() => voteDown(item.id)}>v</div>
            <div>Vote count: {item.voteCount}</div>
          </div>
        // ))
        }
    </div>
  );
};
