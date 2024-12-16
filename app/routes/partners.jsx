import {useLoaderData} from '@remix-run/react';
import CardPartners from '~/components/cardPartners';

/**
 * @typedef {Object} Partner
 * @property {string} id
 * @property {Object} name
 * @property {Object} image
 * @property {Object} description
 * @property {Object} linkUrl
 */

/**
 * @param {object} context
 * @returns {Promise<{partners: Partner[]}>}
 */
export async function loader({context}) {
  const data = await context.storefront.query(PARTNERS_QUERY);
  return {partners: data.metaobjects.nodes};
}

/**
 * @returns {JSX.Element}
 */
export default function Partners() {
  const {partners} = useLoaderData();

  return (
    <section className="py-10 text text-textBrown">
      <h2 className="font-kreon text-[1.8rem]">Nos partenaires</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {partners.map(({id, name, image, description, linkUrl}) => (
          <CardPartners
            key={id}
            name={name.value}
            image={image.reference.image.url}
            description={description.value}
            linkUrl={linkUrl.value}
          />
        ))}
      </div>
    </section>
  );
}

const PARTNERS_QUERY = `#graphql
query partners {
  metaobjects(first: 250, type: "partners") {
    nodes {
      id
      name: field(key: "name") {
        value
      }
      image: field(key: "image") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      description: field(key: "description") {
        value
      }
      linkUrl: field(key: "link") {
        value
      }
    }
  }
}
`;
