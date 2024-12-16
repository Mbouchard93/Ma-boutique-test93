import {useState, useEffect} from 'react';
import {RiHeartAdd2Line, RiHeartFill} from 'react-icons/ri';
import Cookies from 'js-cookie';

/**
 * @typedef {Object} AddToWishlist
 * @property {string} productId
 * @property {function} [onRemove]
 */

/**
 * @param {AddToWishlist} props
 * @returns {JSX.Element}
 */
export default function AddToWishlist({productId, onRemove}) {
  const [isLiked, setIsLiked] = useState(false);

  /**
   * @returns {Object}
   */
  const getWishlisted = () => {
    return JSON.parse(Cookies.get('wishlist') || '{}');
  };

  /**
   * @param {Object} wishlisted
   */
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

  /**
   * @param {Event} e
   */
  const onAdd = (e) => {
    e.preventDefault();
    const wishlisted = getWishlisted();
    wishlisted[productId] = true;
    setWishlisted(wishlisted);
    setIsLiked(true);
  };

  /**
   * @param {Event} e
   */
  const onRemoveHandler = (e) => {
    e.preventDefault();
    const wishlisted = getWishlisted();
    delete wishlisted[productId];
    setWishlisted(wishlisted);
    setIsLiked(false);
    if (onRemove) {
      onRemove(productId);
    }
  };

  return isLiked ? (
    <button onClick={onRemoveHandler}>
      <RiHeartFill color="red" />
    </button>
  ) : (
    <button onClick={onAdd}>
      <RiHeartAdd2Line />
    </button>
  );
}
