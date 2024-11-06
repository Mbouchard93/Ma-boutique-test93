import {useState} from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="w-fit text-center p-4 grid gap-2">
      <p>{count}</p>
      <div>
        <button
          className="w-[30px] h-[30px] rounded-4xl border"
          onClick={increment}
        >
          +
        </button>
        <button
          className="w-[30px] h-[30px] rounded-4xl border"
          onClick={decrement}
        >
          -
        </button>
      </div>
    </div>
  );
}
