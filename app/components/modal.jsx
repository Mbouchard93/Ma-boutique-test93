export default function Modal({
  isVisible = false,
  setIsVisible = () => {},
  children,
}) {
  return (
    <div
      className={` ${
        isVisible ? '' : 'hidden'
      } w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center`}
    >
      <div className="bg-white max-w-[550px] min-[300px] w-full p-3">
        <div className="flex justify-end">
          <button
            className="cursor-pointer"
            onClick={() => setIsVisible(false)}
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
