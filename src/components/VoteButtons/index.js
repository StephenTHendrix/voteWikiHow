import React from "react";
import "./style.css";
import { actions as itemsActions } from "../../state/items";
import { useDispatch } from "react-redux";


export function VoteUpButton(props) {
  const dispatch = useDispatch();
  const voteUp = (documentId) => dispatch(itemsActions.voteUp(documentId));

  return (
    <button className="arrow-up" onClick={() => voteUp(props.id)}>
    </button>
  );
}

export function VoteDownButton(props) {
  const dispatch = useDispatch();
  const voteDown = (documentId) => dispatch(itemsActions.voteDown(documentId));

  return (
    <button className ="arrow-down" onClick={() => voteDown(props.id)}>
    </button>
  );
}
