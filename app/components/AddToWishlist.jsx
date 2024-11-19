import {useState, useEffect} from 'react';
import {RiHeartAdd2Line, RiHeartFill} from 'react-icons/ri';
import Cookies from 'js-cookie';

export default function AddToWishlist({productId}) {
  const [isLiked, setIsLiked] = useState(false);

  const getWishlisted = () => {
    return JSON.parse(Cookies.get('wishlist') || '{}');
  };

  const setWishlisted = (wishlisted) => {
    Cookies.set('wishlist', JSON.stringify(wishlisted), {
      expires: 7,
      sameSite: 'strict',
    });
  };

  useEffect(() => {
    const wishlisted = getWishlisted();
    setIsLiked(wishlisted[productId] === true);
  }, [productId]);

  const onAdd = (e) => {
    e.preventDefault();
    const wishlisted = getWishlisted();
    wishlisted[productId] = true;
    setWishlisted(wishlisted);
    setIsLiked(true);
  };

  const onRemove = (e) => {
    e.preventDefault();
    const wishlisted = getWishlisted();
    delete wishlisted[productId];
    setWishlisted(wishlisted);
    setIsLiked(false);
  };

  return isLiked ? (
    <button onClick={onRemove}>
      <RiHeartFill color="red" />
    </button>
  ) : (
    <button onClick={onAdd}>
      <RiHeartAdd2Line />
    </button>
  );
}
