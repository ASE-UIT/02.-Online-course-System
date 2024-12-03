import React from "react";
import { FaStar, FaRegStar, FaStarHalfStroke } from "react-icons/fa6";

const Rating = ({ rating, maxRating = 5, className = "", parentClass = "" }) => {
  const ratings = Array.from({ length: maxRating }, (_, index) => {
    if (index < Math.floor(rating)) {
      return <FaStar key={index} className={`text-yellow-400 ${className}`} />; // Filled star
    } else if (index === Math.floor(rating) && rating % 1 !== 0) {
      return <FaStarHalfStroke key={index} className={`text-yellow-400 ${className}`} />; // Half star
    } else {
      return <FaRegStar key={index} className={`text-yellow-400 ${className}`} />; // Outline star
    }
  });
  return <div className={`flex ${parentClass}`}>{ratings}</div>;
};

export default Rating;
