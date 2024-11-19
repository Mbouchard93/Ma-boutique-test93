import {useState} from 'react';
import {Input} from './Input';

export default function Searchs({searchs = []}) {
  const [values, setValues] = useState(
    searchs.map((search) => search.defaultValue),
  );

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
