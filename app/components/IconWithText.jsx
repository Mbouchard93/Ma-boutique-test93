export default function IconWithText({src, text, alt}) {
  return (
    <div className="w-[200px] flex flex-col items-center gap-2 ">
      <img className="h-32" src={src} alt={alt} />
      <p className="text-center">{text}</p>
    </div>
  );
}
