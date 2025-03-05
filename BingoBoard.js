import React, { useState, useEffect } from "react";
import BingoCell from "./BingoCell";
import Confetti from "./Confetti";
import "./BingoBoard.css";

const originalPhrases = [
  "I don't care, you choose", "Someone suggests sushi (again)", "Let’s go somewhere cheap",
  "Too far, let’s pick something closer", "I had that yesterday",
  "Someone mentions a diet", "Let’s try something new!", "Someone is craving burgers", "A debate over spicy vs. mild",
  "What about that place we went last time?", "Someone suggests fast food", 
  "Let’s check reviews first", "Someone changes their mind last minute",
  "I’m not that hungry", "As long as they have good coffee", "What time does it open?", 
  "Too many options = no decision", "Someone vetoes a place immediately", "Let’s just order delivery", 
  "Someone wants something fancy", "Let's split the bill evenly", "A decision is finally made!", 
  "Someone still isn’t happy with the choice","Can't we just have some dessert?"
];

const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const BingoBoard = () => {
  const [shuffledPhrases, setShuffledPhrases] = useState([]);
  const [selectedCells, setSelectedCells] = useState(["Let's Plan Lunch!"]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [previousBingos, setPreviousBingos] = useState(0);

  useEffect(() => {
    let newShuffled = shuffleArray(originalPhrases);
    newShuffled.splice(12, 0, "Let's Plan Lunch!"); // Keep the center fixed
    setShuffledPhrases(newShuffled);
  }, []); // Runs only on component mount

  const checkBingo = (cells) => {
    const grid = Array(5).fill().map(() => Array(5).fill(false));
    shuffledPhrases.forEach((phrase, i) => {
      const row = Math.floor(i / 5);
      const col = i % 5;
      if (cells.includes(phrase)) {
        grid[row][col] = true;
      }
    });

    let bingoCount = 0;
    for (let i = 0; i < 5; i++) {
      if (grid[i].every(Boolean)) bingoCount++;
      if (grid.map(row => row[i]).every(Boolean)) bingoCount++;
    }
    if ([0, 1, 2, 3, 4].every(i => grid[i][i])) bingoCount++;
    if ([0, 1, 2, 3, 4].every(i => grid[i][4 - i])) bingoCount++;
    return bingoCount;
  };

  const handleClick = (phrase) => {
    if (selectedCells.includes(phrase)) return;

    const newSelection = [...selectedCells, phrase];
    setSelectedCells(newSelection);
    const bingoCount = checkBingo(newSelection);

    if (bingoCount > previousBingos) {
      setPreviousBingos(bingoCount);
      setShowConfetti(false);
      setTimeout(() => setShowConfetti(true), 100);
    }
  };

  return (
    <div className="bingo-board">
      {shuffledPhrases.map((phrase, index) => (
        <BingoCell
          key={index}
          text={phrase}
          isSelected={selectedCells.includes(phrase)}
          onClick={() => handleClick(phrase)}
        />
      ))}
      <Confetti key={previousBingos} show={showConfetti} />
    </div>
  );
};

export default BingoBoard;
