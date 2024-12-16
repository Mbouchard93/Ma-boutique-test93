import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import IconsWithText from '~/components/IconsWithText';
import AddToWishlist from '~/components/AddToWishlist';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="home max-w-[1280px] font-lora text-textBrown">
      <FeaturedCollection collection={data.featuredCollection} />
      <CarbonEmprunt />
      <IconsWithText />
      <RecommendedProducts products={data.recommendedProducts} />
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <div className="flex flex-col md:flex-row py-10 justify-between ">
      {image && (
        <div className="featured-collection-image md:order-2  ">
          <Image data={image} sizes="(max-width: 800px) 100vw, 800px" />
        </div>
      )}
      <div className="flex flex-col gap-10 max-w-[450px]">
        <h1>{collection.title}</h1>
        <p>{collection.description}</p>
        <Link
          className="featured-collection "
          to={`/collections/${collection.handle}`}
        >
          <button className="bg-orange text-light px-4 py-2 rounded-sm shadow-btnBrown hover:shadow-btnBrownHover cursor-pointer ">
            Voir la collection
          </button>
        </Link>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  const {open} = useAside();
  return (
    <div className="recommended-products py-10">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <div key={product.id} className="flex flex-col gap-2">
                      <Link
                        key={product.id}
                        className="recommended-product"
                        to={`/products/${product.handle}`}
                      >
                        <Image
                          data={product.images.nodes[0]}
                          aspectRatio="1/1"
                          sizes="(min-width: 45em) 20vw, 50vw"
                        />
                        <div className="flex justify-between">
                          <h4>{product.title}</h4>
                          <AddToWishlist productId={product.id} />
                        </div>

                        <Money data={product.priceRange.minVariantPrice} />
                      </Link>
                      <AddToCartButton
                        onClick={() => {
                          open('cart');
                        }}
                        lines={[
                          {
                            merchandiseId: product.variants.nodes[0].id,
                            quantity: 1,
                            selectedVariant: product.variants.nodes[0],
                          },
                        ]}
                      >
                        Ajouter
                      </AddToCartButton>
                    </div>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

function CarbonEmprunt() {
  return (
    <div className="text-textBrown flex flex-col font-lora gap-4 py-8">
      <h3 className="text-[1.6rem] font-kreon">
        Saviez-vous qu&apos;acheter des articles usagés réduit considérablement
        votre empreinte carbone ?
      </h3>
      <p>
        En choisissant des produits de seconde main, vous contribuez à préserver
        les ressources naturelles et à diminuer les émissions de CO2.Nos
        produits sont soigneusement sélectionnés et restaurés pour vous offrir
        la beauté intemporelle du vintage, tout en garantissant une
        fonctionnalité moderne.
      </p>
      <Link
        className="bg-textBrown text-light px-4 py-2 w-fit  shadow-btnBrown hover:shadow-btnBrownHover cursor-pointer  rounded-sm"
        to={'/calculatorCarbon'}
      >
        Calculter votre emprunt carbonne
      </Link>
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    description
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    variants(first : 1){
      nodes{
        id
        selectedOptions{
        name
        value
        }
        product {
        handle
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 3, sortKey: UPDATED_AT, reverse: false) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
