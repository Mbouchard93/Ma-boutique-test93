import {useState} from 'react';
import {Input} from './Input';

/**
 * @typedef {Object} Search
 * @property {number} id
 * @property {string} defaultValue
 */

/**
 * @typedef {Object} Searchs
 * @property {Search[]} searchs
 */

/**
 * @param {Searchs} props
 * @returns {JSX.Element}
 */
export default function Searchs({searchs = []}) {
  const [values, setValues] = useState(
    searchs.map((search) => search.defaultValue),
  );

  /**
   * @param {number} index
   * @param {string} concatValue
   * @returns {void}
   */
  const handleInputChange = (index, concatValue) => {
    const updatedValues = [...values];
    updatedValues[index] = concatValue;
    setValues(updatedValues);
  };

  const concatenatedValues = values.join(' ');

  return (
    <div>
      {searchs.map((search, index) => (
        <Input
          key={search.id}
          initialValue={search.defaultValue}
          onInputChange={(concatValue) => handleInputChange(index, concatValue)}
        />
      ))}
      <span>{concatenatedValues}</span>
    </div>
  );
}
