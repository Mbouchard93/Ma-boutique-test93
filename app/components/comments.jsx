import React, {useState, useEffect} from 'react';

/**
 * @typedef {Object} Comments
 * @property {string} productId
 */

/**
 * @param {Comments} props
 * @returns {JSX.Element}
 */
export default function Comments({productId}) {
  const [inputValue, setInputValue] = useState('');
  const [comments, setComments] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedComments = localStorage.getItem(`comments-${productId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
    setIsInitialized(true);
  }, [productId]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(`comments-${productId}`, JSON.stringify(comments));
    }
  }, [comments, productId, isInitialized]);

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  /**
   * @param {React.FormEvent} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      setComments([...comments, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div>
      <h3 className="font-kreon text-[1.4rem]">Donner nous votre avis</h3>
      <div className="flex gap-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Laissez un commentaire"
          className="w-full h-[4rem]"
        />
        <button
          className="bg-orange text-light px-6 rounded-sm py-3 place-self-center cursor-pointer"
          onClick={handleSubmit}
        >
          Envoyer
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {comments.map((comment) => (
          <p className="py-5 px-2 rounded-sm bg-[#f0e6da]" key={comment}>
            {comment}
          </p>
        ))}
      </div>
    </div>
  );
}
