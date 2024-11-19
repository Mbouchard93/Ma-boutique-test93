import {useState} from 'react';
import SearchBar from '~/components/SearchBar';
import Accordions from '~/components/accordions';
import {useLoaderData} from '@remix-run/react';

export async function loader({context}) {
  const data = await context.storefront.query(FAQS_QUERRY);
  return {faqs: data.metaobjects.nodes};
}

export default function Faq() {
  const [searchValue, setSearchValue] = useState('');

  function onSearch(e) {
    const value = e.target.value;
    setSearchValue(value);
  }
  const {faqs} = useLoaderData();
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
            return faq.question.value
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          })
          .map((faq) => {
            return {
              id: faq.id,
              title: faq.question.value,
              content: faq.reponse.value,
            };
          })}
      />
    </>
  );
}

const FAQS_QUERRY = ` #graphql
query faqs {
  metaobjects(first:100, type: "faq"){
    nodes{
      id
      question : field(key:"question"){
        value
      }
      reponse : field(key: "reponse"){
        value
      }
      categorie: field(key: "categorie"){
        value
      }
    }
  }
}
`;
