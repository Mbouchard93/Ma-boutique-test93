import {useState} from 'react';
import Accordion from './Accordion';

export default function Accordions({accordions = []}) {
  const [currentAccordionId, setCurrentAccordionId] = useState(0);

  function visibleAccordion(accordionId) {
    setCurrentAccordionId((prevId) =>
      prevId === accordionId ? null : accordionId,
    );
  }

  return (
    <div>
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
