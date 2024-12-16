import {useLoaderData} from '@remix-run/react';
import Contenue from '~/components/Contenue';
import {CONTENUE_QUERRY} from '~/graphql/customer-account/dynamicContents';

/**
 * @param {object} context
 * @returns {Promise<{contenues: object[]}>}
 */
export async function loader({context}) {
  const data = await context.storefront.query(CONTENUE_QUERRY);

  return {contenues: data?.metaobjects?.nodes ?? []};
}

/**

 * @returns {JSX.Element}
 */
export default function Contenues() {
  const {contenues} = useLoaderData();
  return <Contenue contents={contenues} />;
}
