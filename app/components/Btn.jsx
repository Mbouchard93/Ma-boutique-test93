/**
 * @typedef {Object} Btn
 * @property {string} content
 * @property {string} className
 * @property {function} [onClick]
 */

/**
 * @param {Btn} props
 * @returns {JSX.Element}
 */
export function Btn({content, className, onClick = () => {}}) {
  return (
    <button
      className={`bg-orange text-light px-4 py-2 shadow-btnBrown hover:shadow-btnBrownHover cursor-pointer rounded-md ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
