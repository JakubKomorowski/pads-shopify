import Header from './Header';
import {Drawer, useDrawer} from '~/components/Drawer';
import {CartLineItems, CartActions, CartSummary} from '~/components/Cart';
import {useMatches} from '@remix-run/react';
import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import {useFetchers} from '@remix-run/react';
import {useEffect} from 'react';

export const MENU_LIST = [
  {text: 'Pads', href: '/pads'},
  {text: 'Contact', href: '/contact'},
];

function CartDrawer({cart, close}) {
  return (
    <Suspense>
      <Await resolve={cart}>
        {(data) => (
          <>
            {data?.totalQuantity > 0 ? (
              <>
                <div className="flex-1 overflow-y-auto">
                  <div className="flex flex-col space-y-7 justify-between items-center md:py-8 md:px-12 px-4 py-6">
                    <CartLineItems linesObj={data.lines} />
                  </div>
                </div>
                <div className="w-full md:px-12 px-4 py-6 space-y-6 border border-1 border-gray-00">
                  <CartSummary cost={data.cost} />
                  <CartActions checkoutUrl={data.checkoutUrl} />
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-7 justify-center items-center md:py-8 md:px-12 px-4 py-6 h-screen">
                <h2 className="whitespace-pre-wrap max-w-prose font-bold text-4xl">
                  Your cart is empty
                </h2>
                <button
                  onClick={close}
                  className="inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none bg-black text-white w-full"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </>
        )}
      </Await>
    </Suspense>
  );
}

export function Layout({children}) {
  const {isOpen, openDrawer, closeDrawer} = useDrawer();
  const [root] = useMatches();
  const cart = root.data?.cart;
  const fetchers = useFetchers();
  const addToCartFetchers = [];
  for (const fetcher of fetchers) {
    if (fetcher?.formData?.get('cartAction') === 'ADD_TO_CART') {
      addToCartFetchers.push(fetcher);
    }
  }
  // When the fetchers array changes, open the drawer if there is an add to cart action
  useEffect(() => {
    if (isOpen || addToCartFetchers.length === 0) return;
    openDrawer();
  }, [addToCartFetchers]);

  return (
    <div className="flex flex-col min-h-screen antialiased bg-neutral-50">
      <header>
        <Header openDrawer={openDrawer} />
      </header>
      <main
        role="main"
        id="mainContent"
        className="flex-grow py-6 md:py-8 lg:py-12"
      >
        {children}
      </main>
      <Drawer open={isOpen} onClose={closeDrawer}>
        <CartDrawer cart={cart} close={closeDrawer} />
      </Drawer>
    </div>
  );
}
