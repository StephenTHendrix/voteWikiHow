import React from "react";
import "./style.css";
import { actions as itemsActions } from "../../state/items";
import { useDispatch } from "react-redux";


export function ScrollUpButton() {
const scrollUp = () => dispatch(itemsActions.scrollUp());
const dispatch = useDispatch();

  return (
    <button onClick={() => scrollUp()}>
      Scroll Up
    </button>
  );
}

export function ScrollDownButton() {
const scrollDown = () => dispatch(itemsActions.scrollDown());
const dispatch = useDispatch();

  return (
    <button onClick={() => scrollDown()}>
      Scroll Down
    </button>
  );
}
