import {faqs} from '~/data/faqs';
import {useState} from 'react';
import SearchBar from '~/components/SearchBar';
import Accordions from '~/components/accordions';

export default function Faq() {
  const [searchValue, setSearchValue] = useState('');

  function onSearch(e) {
    const value = e.target.value;
    setSearchValue(value);
  }

  return (
    <>
      <h1>FAQ</h1>
      <SearchBar onInput={onSearch} />
      <Accordions
        accordions={faqs
          .filter((faq) => {
            if (!searchValue) {
              return true;
            }
            return faq.question.includes(searchValue);
          })
          .map((faq) => {
            return {id: faq.id, title: faq.question, content: faq.answer};
          })}
      />
    </>
  );
}
