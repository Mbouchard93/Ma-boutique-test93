import {useState} from 'react';
import img1 from '../assets/contenuImg.jpg';
import {IoMdArrowBack, IoMdArrowForward} from 'react-icons/io';

/**
 * @typedef {Object} Content
 * @property {number} id
 * @property {Object} titre
 * @property {Object} description
 * @property {Object} link
 * @property {Object} label
 */

/**
 * @typedef {Object} Contenue
 * @property {Content[]} contents
 */

/**
 * @param {Contenue} props
 * @returns {JSX.Element}
 */
export default function Contenue({contents = []}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * @returns {void}
   */
  function next() {
    setCurrentIndex(currentIndex >= contents.length - 1 ? 0 : currentIndex + 1);
  }

  /**
   * @returns {void}
   */
  function previous() {
    setCurrentIndex(currentIndex <= 0 ? contents.length - 1 : currentIndex - 1);
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-5">
      <div className="flex flex-col justify-between">
        {contents.map((content, index) => (
          <div
            key={content.id}
            className={`${
              currentIndex !== index && 'hidden'
            } max-w-[420px] flex flex-col gap-4 order-2 lg:order-1`}
          >
            <h3 className="text-[1.6rem] font-kreon text-orange">
              {content.titre.value}
            </h3>
            <p>{content.description.value}</p>
            <button className="bg-orange text-light px-4 w-fit py-1 rounded-sm shadow-btnBrown hover:shadow-btnBrownHover cursor-pointer">
              <a target="_blank" rel="noreferrer" href={content.link.value}>
                {content.label.value}
              </a>
            </button>
          </div>
        ))}
        <div className="flex justify-between lg:py-0 py-2 order-2 lg:order-1">
          <button className="cursor-pointer" onClick={previous}>
            <IoMdArrowBack size={'26px'} className="text-orange" />
          </button>
          <button className="cursor-pointer" onClick={next}>
            <IoMdArrowForward size={'26px'} className="text-orange" />
          </button>
        </div>
      </div>
      <figure className="max-h-[250px] overflow-hidden">
        <img
          className="object-cover h-full w-full"
          src={img1}
          alt="Vintage product"
        />
      </figure>
    </div>
  );
}
