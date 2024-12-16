import {useLoaderData, Link} from '@remix-run/react';
import {useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import AddToWishlist from '~/components/AddToWishlist';

/**
 * @param {object} context
 * @param {Request} request
 * @returns {Promise<{products: object[]}>}
 */
export async function loader({context, request}) {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) {
    return {products: []};
  }
  const cookies = cookieHeader.split('; ').map((cookie) => cookie.split('='));
  const wishlisted = cookies.find((cookie) => cookie[0] === 'wishlist');

  if (wishlisted) {
    const wishlistValue = JSON.parse(decodeURIComponent(wishlisted[1]));
    const productIds = Object.keys(wishlistValue);
    const data = await context.storefront.query(PRODUCTS_QUERY, {
      variables: {ids: productIds},
    });
    return {products: data.nodes};
  }

  return {products: []};
}

/**
 * @returns {JSX.Element}
 */
export default function Wishlist() {
  const data = useLoaderData();
  const [products, setProducts] = useState(data.products || []);

  /**
   * @param {string} productId
   * @returns {void}
   */
  const handleRemoveFromWishlist = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <section>
      <h2 className="font-kreon text-textBrown">Produit Aimé</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product.id}
              className="recommended-product"
              to={`/products/${product.handle}`}
            >
              <Image
                src={product.featuredImage.url}
                aspectRatio="1/1"
                sizes="(min-width: 45em) 20vw, 50vw"
              />
              <h4>{product.title}</h4>
              <AddToWishlist
                productId={product.id}
                onRemove={handleRemoveFromWishlist}
              />
              <small>
                <Money data={product.priceRange.minVariantPrice} />
              </small>
            </Link>
          ))
        ) : (
          <p>Aucun produit dans votre wishlist.</p>
        )}
      </div>
    </section>
  );
}

const PRODUCTS_QUERY = `#graphql
fragment MoneyProductItem on MoneyV2 {
  amount
  currencyCode
}

query Products($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on Product {
      id
      title
      handle
      featuredImage {
        url(transform: {maxHeight: 200, maxWidth: 200})
      }
      priceRange {
        minVariantPrice {
          ...MoneyProductItem
        }
        maxVariantPrice {
          ...MoneyProductItem
        }
      }
    }
  }
}
`;
