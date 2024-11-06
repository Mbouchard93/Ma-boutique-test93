import {SlArrowDown} from 'react-icons/sl';

export default function Accordion({
  title,
  content,
  isOpen = true,
  onClick = () => {},
}) {
  return (
    <div>
      <button
        className="cursor-pointer flex items-center gap-2"
        onClick={onClick}
      >
        <h2>{title}</h2>
        <SlArrowDown className={`${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <p className={`${isOpen ? '' : 'hidden'}`}>{content}</p>
    </div>
  );
}
