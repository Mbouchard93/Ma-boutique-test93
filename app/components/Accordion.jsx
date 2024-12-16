import {SlArrowDown} from 'react-icons/sl';

/**
 * @typedef {Object} Accordion
 * @property {string} title
 * @property {string} content
 * @property {boolean} [isOpen=true]
 * @property {function} [onClick]
 */

/**
 * @param {Accordion} props
 * @returns {JSX.Element}
 */
export default function Accordion({
  title,
  content,
  isOpen = true,
  onClick = () => {},
}) {
  return (
    <div className="w-full flex flex-col gap-2 shadow-orange-100 shadow-md  p-2 rounded-md">
      <button
        className="cursor-pointer flex items-center gap-2 w-full font-medium justify-between p-2"
        onClick={onClick}
      >
        <h3 className="text-textBrown text-[1.1rem] font-lora">{title}</h3>
        <SlArrowDown
          className={`text-textBrown ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <p className={`font-lora text-textBrown ${isOpen ? '' : 'hidden'}`}>
        {content}
      </p>
    </div>
  );
}
