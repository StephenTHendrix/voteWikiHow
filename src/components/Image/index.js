import React from "react";
import "./style.css";

export function Image(props) { 
    return (
      <img id ="fixed" src={props.image} alt="wiki" />
    );
  }
