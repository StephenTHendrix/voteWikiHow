import React from "react";
import { useDispatch } from "react-redux";

import "./style.css";
import { actions as itemsActions } from "../../state/items";

export function ScrollUpButton() {
  const dispatch = useDispatch();
  const scrollUp = () => dispatch(itemsActions.scrollUp());

  return (
    <button className="arrow-left" onClick={() => scrollUp()}>
      Scroll Left
    </button>
  );
}

export function ScrollDownButton() {
  const dispatch = useDispatch();
  const scrollDown = () => dispatch(itemsActions.scrollDown());

  return (
    <button className="arrow-right" onClick={() => scrollDown()}>
      Scroll Right
    </button>
  );
}
