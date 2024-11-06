export default function SearchBar({onInput = () => {}}) {
  return (
    <>
      <label>
        Search
        <input onInput={onInput} type="text" />
      </label>
    </>
  );
}
