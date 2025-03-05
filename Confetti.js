import React from "react";
import "./Confetti.css";

const foodEmojis = ["🍔", "🍕", "🍣", "🌮", "🍩"];

const Confetti = ({ show }) => {
  if (!show) return null;

  return (
    <div className="confetti-container">
      {Array.from({ length: 50 }).map((_, i) => (
        <span key={i} className="confetti" style={{
          left: `${Math.random() * 100}vw`,
          animationDelay: `${Math.random() * 1.5}s`,
          animationDuration: `${1.5 + Math.random()}s`, // Random fall speed
          transform: `rotate(${Math.random() * 360}deg)`,
          opacity: `${0.5 + Math.random() * 0.5}` // Random transparency
        }}>
          {foodEmojis[Math.floor(Math.random() * foodEmojis.length)]}
        </span>
      ))}
    </div>
  );
};

export default Confetti;
