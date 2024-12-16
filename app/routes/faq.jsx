import {useState} from 'react';
import SearchBar from '~/components/SearchBar';
import Accordions from '~/components/accordions';
import {useLoaderData} from '@remix-run/react';

/**
 * @typedef {Object} Faq
 * @property {string} id
 * @property {Object} question
 * @property {Object} reponse
 * @property {Object} categorie
 */

/**
 * @param {object} context
 * @returns {Promise<{faqs: Faq[]}>}
 */
export async function loader({context}) {
  const data = await context.storefront.query(FAQS_QUERRY);
  return {faqs: data.metaobjects.nodes};
}

/**
 * @returns {JSX.Element}
 */
export default function Faq() {
  const [searchValue, setSearchValue] = useState('');

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @returns {void}
   */
  function onSearch(e) {
    const value = e.target.value;
    setSearchValue(value);
  }

  const {faqs} = useLoaderData();

  return (
    <section className="max-w-[680px] flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-textBrown font-kreon">
          Questions Fréquemment Posées
        </h2>
        <p className="font-lora text-textBrown">
          Vous avez des questions ? Nous avons les réponses ! Si vous ne trouvez
          pas ce que vous cherchez, contactez-nous pour plus
          d&lsquo;informations.
        </p>
      </div>
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
    </section>
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
