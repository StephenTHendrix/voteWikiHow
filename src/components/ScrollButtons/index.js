import React from "react";
import "./style.css";
import { actions as itemsActions } from "../../state/items";
import { useDispatch } from "react-redux";


export function ScrollUpButton() {
const scrollUp = () => dispatch(itemsActions.scrollUp());
const dispatch = useDispatch();

  return (
    <button className ="arrow-left" onClick={() => scrollUp()}>
      Scroll Left
    </button>
  );
}

export function ScrollDownButton() {
const scrollDown = () => dispatch(itemsActions.scrollDown());
const dispatch = useDispatch();

  return (
    <button className="arrow-right" onClick={() => scrollDown()}>
      Scroll Right
    </button>
  );
}
