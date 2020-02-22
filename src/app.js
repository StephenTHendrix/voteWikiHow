import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actions as itemsActions } from "./state/items";

import { ScrollUpButton, ScrollDownButton } from "./components/ScrollButtons/index.js"
import { VoteUpButton, VoteDownButton } from "./components/VoteButtons/index.js"
import { Image } from "./components/Image/index.js"

export const App = () => {
  const dispatch = useDispatch();
  const items = useSelector(({ items }) => items.items);
  const scrollIndex = useSelector(( { items } ) => items.scrollIndex);
  const item = items[scrollIndex];
  console.log(item)
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
          <div key={item.id}>
            <Image image={item.imageUrl} alt="wiki" />
            <div>{item.caption}</div>
            <VoteUpButton id={item.id}/>
            <VoteDownButton id={item.id}/>
            <ScrollUpButton/>
            <ScrollDownButton/>
            <div>Vote count: {item.voteCount}</div>
          </div>
        }
    </div>
  );
};
