export function Btn({content, className, onClick = () => {}}) {
  return (
    <button
      className={` bg-blue-500 text-white py-2  px-4 hover:bg-amber-700 cursor-pointer rounded-md ${className} `}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
