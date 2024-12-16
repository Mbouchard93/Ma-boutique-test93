import {Btn} from './Btn';
import Modal from './modal';
import {useState} from 'react';

/**
 * @typedef {Object} CardPartners
 * @property {string} name
 * @property {string} image
 * @property {string} description
 * @property {string} linkUrl
 */

/**
 * @param {CardPartners} props
 * @returns {JSX.Element}
 */
export default function CardPartners({name, image, description, linkUrl}) {
  const [isDetailsVisible, setIsDetailVisible] = useState(false);

  return (
    <div className="shadow-xl grid gap-4 justify-center p-6 max-w-[325px] rounded-lg">
      <img src={image} alt={`logo de l'entreprise ${name}`} />
      <h2 className="text-center">{name}</h2>
      <Btn
        content="Details"
        onClick={() => {
          setIsDetailVisible(true);
        }}
      />
      <Modal isVisible={isDetailsVisible} setIsVisible={setIsDetailVisible}>
        <div className="flex flex-col gap-5">
          <h3 className="text-[1.4rem] font-kreon">{name}</h3>
          <img src={image} alt={`logo de l'entreprise ${name}`} />
          <p className="font-lora">{description}</p>
          <a href={linkUrl} target="_blank" rel="noreferrer">
            <button className="font-kreon py-2 px-4 rounded-sm bg-textBrown text-light">
              Voir sur le web
            </button>
          </a>
        </div>
      </Modal>
    </div>
  );
}
