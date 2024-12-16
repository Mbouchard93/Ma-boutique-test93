import {useState, useEffect} from 'react';
/**
 *
 * @returns {JSX.Element}
 */
export default function Grille() {
  const initialColors = Array(9).fill('bg-green-500');
  const [cellColors, setCellColors] = useState(initialColors);
  const [savedPattern, setSavedPattern] = useState(null);

  useEffect(() => {
    const savedColors = localStorage.getItem('savedPattern');
    if (savedColors) {
      const parsedColors = JSON.parse(savedColors);
      setCellColors(parsedColors);
      setSavedPattern(parsedColors);
    }
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
    setSavedPattern(cellColors);
  }
  return (
    <section className="flex gap-10">
      <div>
        <div className="flex justify-between mb-4">
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Reset
          </button>
          <button
            onClick={savePattern}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Save
          </button>
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
      {savedPattern && (
        <div>
          <h3>Pattern</h3>
          <div className="grid grid-cols-3 gap-2 h-fit">
            {savedPattern.map((color, index) => (
              <div
                key={index}
                className={`h-5 w-5 rounded-full ${color}`}
              ></div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
