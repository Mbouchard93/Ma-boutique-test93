/**
 * @typedef {Object} IconWithText
 * @property {string} src
 * @property {string} text
 * @property {string} alt
 */

/**
 * @param {IconWithText} props
 * @returns {JSX.Element}
 */
export default function IconWithText({src, text, alt}) {
  return (
    <div className="w-[260px] flex flex-col items-center gap-2">
      <img className="min-h-[260px]" src={src} alt={alt} />
      <p className="text-center">{text}</p>
    </div>
  );
}
