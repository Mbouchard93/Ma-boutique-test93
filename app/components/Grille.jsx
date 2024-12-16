import {useState, useEffect} from 'react';
/**
 *
 * @returns {JSX.Element}
 */
export default function Grille() {
  const initialColors = Array(9).fill('bg-green-500');
  const [cellColors, setCellColors] = useState(initialColors);
  const [savedPattern, setSavedPattern] = useState([initialColors]);

  useEffect(() => {
    const savedColors = localStorage.getItem('savedPattern');
  }, []);
  useEffect(() => {
    localStorage.setItem('cellColors', JSON.stringify(cellColors));
  }, [cellColors]);

  /**
   *
   * @param {number} index
   * @returns {void}
   */
  function toggleColor(index) {
    setCellColors((prevColors) => {
      const newColors = [...prevColors];
      if (newColors[index] === 'bg-green-500') {
        newColors[index] = 'bg-yellow-500';
      } else if (newColors[index] === 'bg-yellow-500') {
        newColors[index] = 'bg-red-500';
      } else {
        newColors[index] = 'bg-green-500';
      }
      return newColors;
    });
  }

  /**
   * @returns {void}
   */
  function reset() {
    setCellColors(initialColors);
  }
  /**
   * @returns {void}
   */
  function savePattern() {
    localStorage.setItem('savedPattern', JSON.stringify(cellColors));

    setSavedPattern((prev) => {
      return [...prev, cellColors];
    });
  }

  return (
    <section className="flex gap-10">
      <div>
        <div className="flex justify-between mb-4">
          <Btn text="reset" onClick={reset} className="bg-blue-500" />
          <Btn text="save" onClick={savePattern} className="bg-green-500" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {cellColors.map((color, index) => (
            <button
              key={index}
              onClick={() => toggleColor(index)}
              className={`h-10 w-10 rounded-full ${color}`}
            ></button>
          ))}
        </div>
      </div>
      <SavedPattern pattern={savedPattern} />
    </section>
  );
}

/**
 *
 * @param {Object}
 * @param {string} text
 * @param {string} className
 * @param {function} onClick
 * @returns
 */

function Btn({text, className, onClick = () => {}}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 ${className} text-white rounded`}
    >
      {text}
    </button>
  );
}

/**
 * @param {Object}
 * @param {string[]}
 * @returns {JSX.Element|null}
 */
function SavedPattern({pattern}) {
  if (!pattern) return null;
  console.log(pattern);
  return (
    <div>
      <h3>pattern</h3>
      {pattern.map((pat, index) => (
        <div key={index} className="grid grid-cols-3 gap-2 h-fit">
          {pat.map((color, index) => (
            <div key={index} className={`h-5 w-5 rounded-full ${color}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
}
