import React from "react";
import "./BingoCell.css"; 

const BingoCell = ({ text, isSelected, onClick }) => {
  return (
    <div 
      className={`bingo-cell ${isSelected ? "selected" : ""}`} 
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default BingoCell;
