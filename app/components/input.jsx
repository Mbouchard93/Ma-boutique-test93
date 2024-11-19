import {useState} from 'react';

export function Input({initialValue = '', onInputChange}) {
  const [value, setValue] = useState(initialValue);

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
