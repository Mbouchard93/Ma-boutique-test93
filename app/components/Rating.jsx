import {useEffect, useState} from 'react';
import {RiStarFill} from 'react-icons/ri';

/**
 * @typedef {Object} Rating
 * @property {number} defaultValue
 */

/**
 * @param {Rating} props
 * @returns {JSX.Element}
 */
export default function Rating({defaultValue = 3}) {
  const btnRatings = [];
  const [currentRating, setCurrentRating] = useState(defaultValue);

  useEffect(() => {
    const rating = localStorage.getItem('rating');
    if (rating) setCurrentRating(parseInt(rating));
  }, [defaultValue]);

  /**
   * @param {number} i
   * @returns {void}
   */
  function handleRatingChange(i) {
    setCurrentRating(i);
    localStorage.setItem('rating', i);
  }

  for (let i = 1; i <= 5; i++) {
    btnRatings.push(
      <button key={i} onClick={() => handleRatingChange(i)}>
        <RiStarFill
          className={`  ${i <= currentRating ? ' text-orange' : 'text-yellow'}`}
        />
      </button>,
    );
  }

  return (
    <div className=" flex gap-[0.1rem]">
      {btnRatings}
      <span>{currentRating}</span>
    </div>
  );
}
