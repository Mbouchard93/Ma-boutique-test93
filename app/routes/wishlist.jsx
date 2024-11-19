import {useLoaderData, Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import AddToWishlist from '~/components/AddToWishlist';

export async function loader({context, request}) {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) {
    return {products: []};
  }
  const cookie = cookieHeader.split(' ;').map((cookie) => cookie.split('='));

  const wishlisted = cookie.find((item) => item[0] === 'wishlist');

  if (wishlisted) {
    const wishlistValue = JSON.parse(decodeURIComponent(wishlisted[1]));
    const productIds = Object.keys(wishlistValue);
    const data = await context.storefront.query(PRODUCTS_QUERY, {
      variables: {ids: productIds},
    });
    return {products: data.nodes};
  }

  return {product: []};
}

export default function Wishlist() {
  const data = useLoaderData();
  return (
    <div>
      {data.products && data.products.length > 0 ? (
        data.products.map((product) => (
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
            <AddToWishlist productId={product.id} />
            <small>
              <Money data={product.priceRange.minVariantPrice} />
            </small>
          </Link>
        ))
      ) : (
        <p>Aucun produit dans votre wishlist.</p>
      )}
    </div>
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
        featuredImage{
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
