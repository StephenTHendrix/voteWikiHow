import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actions as itemsActions } from "./state/items";

import {
  VoteUpButton,
  VoteDownButton
} from "./components/VoteButtons/index.js";
import { Image } from "./components/Image/index.js";
import { Wrapper } from "./components/Wrapper/index.js";
import { SkipButton } from "./components/skipButton";

export const App = () => {
  const dispatch = useDispatch();
  const items = useSelector(({ items }) => items.items || []);
  const itemIndex = useSelector(({ items }) => items.itemIndex);
  const item = items[itemIndex];

  useEffect(() => {
    const getItems = () => dispatch(itemsActions.getItems());
    getItems();
  }, [dispatch]);

  const handleSkip = () => {
    const nextItemIndex = itemIndex === items.length - 1 ? 0 : itemIndex + 1;
    const setItemIndex = () => dispatch(itemsActions.setItemIndex(nextItemIndex));
    setItemIndex();
  };

  return (
    <div>
      {items.length && (
        <Wrapper>
          <div key={item.id}>
            <Image image={item.imageUrl} alt="wiki" />
            <VoteUpButton id={item.id} />
            <VoteDownButton id={item.id} />
            <div>{item.caption}</div>
            <div>Vote count: {item.voteCount}</div>
            <SkipButton onClick={handleSkip} />
          </div>
        </Wrapper>
      )}
    </div>
  );
};
