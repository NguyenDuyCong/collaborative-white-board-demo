import React, { useState } from "react";
import Board from "../board/Board";
import "./Container.css";

const Container = () => {
  const [color, setColor] = useState("#0000FF");
  const [size, setSize] = useState(5);

  const onChangeColor = (e) => {
    // console.log(e.target.value);
    setColor(e.target.value);
  };

  const onChangeBrushSize = (e) => {
    setSize(e.target.value);
  };

  return (
    <div className="container">
      <div className="tools-section">
        <div className="color-picker-container">
          Select Brush Color
          <input
            type="color"
            name="color-picker"
            id="color-picker"
            value={color}
            onChange={onChangeColor}
          />
        </div>
        <div className="brushsize-container">
          Select Brush Size
          <select value={size} onChange={onChangeBrushSize}>
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>25</option>
            <option>30</option>
          </select>
        </div>
      </div>
      <div className="board-container">
        <Board color={color} size={size}></Board>
      </div>
    </div>
  );
};

export default Container;
