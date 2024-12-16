import {useState} from 'react';

/**
 * @typedef {Object} Input
 * @property {string} initialValue
 * @property {function} onInputChange
 */

/**
 * @param {Input} props
 * @returns {JSX.Element}
 */
export function Input({initialValue = '', onInputChange}) {
  const [value, setValue] = useState(initialValue);

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @returns {void}
   */
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onInputChange(newValue);
  };

  return (
    <div>
      <input value={value} type="text" onChange={handleChange} />
    </div>
  );
}
