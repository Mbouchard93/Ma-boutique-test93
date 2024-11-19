import {useEffect, useState} from 'react';

export default function Rating({defaultValue = 3}) {
  const btnRatings = [];
  const [currentRating, setCurrentRating] = useState(defaultValue);

  useEffect(() => {
    const rating = localStorage.getItem('rating');
    if (rating) setCurrentRating(parseInt(rating));
  }, [defaultValue]);

  for (let i = 1; i <= 5; i++) {
    btnRatings.push(
      <button
        key={i}
        onClick={() => {
          setCurrentRating(i);
          localStorage.setItem('rating', i);
        }}
        className={`w-[15px] h-[15px] border-2 rounded-full border-red-400 ${
          i <= currentRating ? 'bg-red-500' : 'bg-transparent'
        }`}
      ></button>,
    );
  }

  return (
    <div className="p-3">
      {btnRatings}
      <span>{currentRating}</span>
    </div>
  );
}
