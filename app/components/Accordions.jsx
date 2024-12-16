import {useState} from 'react';
import Accordion from './Accordion';

/**
 * @typedef {Object} Accordions
 * @property {Array<Object>} accordions
 */

/**
 * @param {Accordions} props
 * @returns {JSX.Element}
 */
export default function Accordions({accordions = []}) {
  const [currentAccordionId, setCurrentAccordionId] = useState(0);

  /**
   * @param {number} accordionId
   */
  function visibleAccordion(accordionId) {
    setCurrentAccordionId((prevId) =>
      prevId === accordionId ? null : accordionId,
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {accordions.map((accordion) => (
        <Accordion
          key={accordion.id}
          title={accordion.title}
          content={accordion.content}
          isOpen={currentAccordionId === accordion.id}
          onClick={() => visibleAccordion(accordion.id)}
        />
      ))}
    </div>
  );
}
