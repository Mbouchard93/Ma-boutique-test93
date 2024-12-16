import {useEffect} from 'react';
import {IoMdClose} from 'react-icons/io';

/**
 * @typedef {Object} Modal
 * @property {boolean} isVisible
 * @property {function} setIsVisible
 * @property {JSX.Element} children
 */

/**
 * @param {Modal} props
 * @returns {JSX.Element}
 */
export default function Modal({
  isVisible = false,
  setIsVisible = () => {},
  children,
}) {
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isVisible]);

  return (
    <div
      className={`${
        isVisible ? '' : 'hidden'
      } w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-10`}
    >
      <div className="bg-[#FCF5ED] max-w-[550px] min-[400px] rounded-md w-full p-6">
        <div className="flex justify-end">
          <button
            className="cursor-pointer"
            onClick={() => setIsVisible(false)}
          >
            <IoMdClose size={'22px'} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
