import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import Facebook from '../assets/facebook.svg';
import Instagram from '../assets/instagram.svg';
import Twiter from '../assets/twiter.svg';

/**
 * @param {FooterProps}
 */
export function Footer({footer: footerPromise, header, publicStoreDomain}) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="footer">
            {footer?.menu && header.shop.primaryDomain?.url && (
              <FooterMenu
                menu={footer.menu}
                primaryDomainUrl={header.shop.primaryDomain.url}
                publicStoreDomain={publicStoreDomain}
              />
            )}
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
 *   publicStoreDomain: string;
 * }}
 */
function FooterMenu({menu, primaryDomainUrl, publicStoreDomain}) {
  const currentYear = new Date().getFullYear();

  return (
    <nav
      className=" p-8 lg:px-0 py-8 max-w-[1280px] lg:m-auto grid lg:gap-4"
      role="navigation"
    >
      <div className="lg:grid lg:grid-cols-2 ">
        <div className="lg:order-2 lg:max-w-[325px] lg:place-self-end">
          <h3 className="text-white font-lora text-[1.3rem] my-[0.5rem]  ">
            Restez à lafut,
            <span className="text-yellow "> abonnez-vous</span> pour obtenir des
            <span className="text-yellow"> offre exclusive</span>
          </h3>
          <form className="flex flex-col">
            <input
              className="bg-[#FCF5ED]"
              type="text"
              placeholder="Adresse-email"
            />
            <button className="uppercase bg-orange cursor-pointer py-2 rounded-[4px] text-light font-medium">
              Soumettre
            </button>
          </form>
        </div>
        <div className="py-5 lg:py-0">
          <h4 className="text-[#FCF5ED] text-[1.4rem] font-lora underline ">
            Menu
          </h4>
          <ul className="grid grid-cols-2 font-lora ">
            {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
              if (!item.url) return null;
              // if the url is internal, we strip the domain
              const url =
                item.url.includes('myshopify.com') ||
                item.url.includes(publicStoreDomain) ||
                item.url.includes(primaryDomainUrl)
                  ? new URL(item.url).pathname
                  : item.url;
              const isExternal = !url.startsWith('/');
              return isExternal ? (
                <li>
                  <a
                    href={url}
                    key={item.id}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.title}
                  </a>
                </li>
              ) : (
                <NavLink
                  end
                  key={item.id}
                  prefetch="intent"
                  style={activeLinkStyle}
                  to={url}
                >
                  {item.title}
                </NavLink>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="bg-[#FCF5ED] shadow-footer flex justify-between py-1 px-4 my-4">
        <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
          <strong className="font-kreon text-[30px] text-rusticBrown uppercase">
            vintage
          </strong>
        </NavLink>
        <div className="flex items-center gap-4">
          <img src={Facebook} aria-label="Lien vers facebook" />
          <img src={Instagram} aria-label="Lien vers instagram" />
          <img src={Twiter} aria-label="Lien vers twiter" />
        </div>
      </div>
      <p className="text-center text-[#FCF5ED]">
        © Mariane {currentYear} Tous droits réservés.
      </p>
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : '#B39E82',
  };
}

/**
 * @typedef {Object} FooterProps
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
