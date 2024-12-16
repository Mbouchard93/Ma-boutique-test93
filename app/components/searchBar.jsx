import {GoSearch} from 'react-icons/go';

/**
 * @typedef {Object} SearchBar
 * @property {function} onInput
 */

/**
 * @param {SearchBar} props
 * @returns {JSX.Element}
 */
export default function SearchBar({onInput = () => {}}) {
  return (
    <div className="relative flex items-center">
      <GoSearch className="absolute left-[95%] text-orange" />
      <input
        className="w-full text-orange font-semibold"
        onInput={onInput}
        type="text"
        placeholder="Que recherche tu?"
      />
    </div>
  );
}
