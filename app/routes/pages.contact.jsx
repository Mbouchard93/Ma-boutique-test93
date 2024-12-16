import {useLoaderData} from '@remix-run/react';
import FormContact from '~/components/formContact';

/**
 * @typedef {Object} Contact
 * @property {string} id
 * @property {Object} email
 * @property {Object} tel
 * @property {Object} adresse
 */

/**
 * @param {object} context
 * @returns {Promise<{contacts: Contact[]}>}
 */
export async function loader({context}) {
  const data = await context.storefront.query(CONTACT_QUERY);
  return {contacts: data.metaobjects.nodes};
}

/**
 * @returns {JSX.Element}
 */
export default function Contact() {
  const {contacts} = useLoaderData();
  return (
    <section className="grid md:grid-cols-2 text-textBrown font-lora gap-6 justify-items-center max-w-[1280px]">
      <div className="flex flex-col gap-4 ">
        <h3 className="font-kreon text-[1.6rem]">Contact nous</h3>
        <p>
          Envie de discuter de nos produits ? N&apos;hésitez pas à nous
          contacter directement ou à remplir notre formulaire de contact. On
          adore recevoir de vos nouvelles !
        </p>
        {contacts.map((contact) => (
          <div key={contact.id} className="flex flex-col gap-2">
            <p>Email : {contact.email.value}</p>
            <p>Tel : {contact.tel.value}</p>
            <p>Adresse : {contact.adresse.value}</p>
          </div>
        ))}
      </div>
      <FormContact />
    </section>
  );
}

const CONTACT_QUERY = `#graphql
query contact {
  metaobjects(first: 250, type: "contact") {
    nodes {
      id
      email: field(key: "email") {
        value
      }
      tel: field(key: "telephone") {
        value
      }
      adresse: field(key: "adresse") {
        value
      }
    }
  }
}
`;
