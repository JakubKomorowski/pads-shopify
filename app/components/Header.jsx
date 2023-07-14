import Dropdown from './Dropdown';
import {MENU_LIST} from './Layout';
import NavItem from './NavItem';
import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import {useMatches} from '@remix-run/react';

function CartHeader({cart, openDrawer}) {
  return (
    <Suspense>
      <Await resolve={cart}>
        {(data) => (
          <button
            className="relative ml-auto flex items-center justify-center "
            onClick={openDrawer}
          >
            Cart
            {data?.totalQuantity > 0 && (
              <span className="ml-1 ">({data?.totalQuantity})</span>
              // <div className="text-contrast bg-red-500 text-white absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px">
              //   <span>{data?.totalQuantity}</span>
              // </div>
            )}
          </button>
        )}
      </Await>
    </Suspense>
  );
}

const Header = ({openDrawer}) => {
  const [root] = useMatches();
  const cart = root.data?.cart;
  return (
    <nav className=" border-b border-grey  font-mukta text-xl ">
      <div className="container mx-auto flex justify-between h-16 items-center">
        <a href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8">
              <img
                width="32px"
                height="32px"
                src="/assets/logo.svg"
                alt="logo"
              />
            </div>
            Logo
          </div>
        </a>
        <ul className="flex gap-16 ">
          {MENU_LIST.map((menu) => {
            return (
              <li
                key={menu.text}
                className="relative transition-all w-min-content
                before:w-0 before:h-px before:absolute before:bottom-0 before:right-0 before:bg-black before:transition-all before:duration-300
                hover:before:w-full hover:before:left-0 hover:before:black text-lg"
              >
                <NavItem {...menu} />
              </li>
            );
          })}
          <li>
            <Dropdown />
          </li>
          <li
            className="cursor-pointer relative transition-all w-min-content
            before:w-0 before:h-px before:absolute before:bottom-0 before:right-0 before:bg-black before:transition-all before:duration-300
            hover:before:w-full hover:before:left-0 hover:before:black text-lg"
          >
            <CartHeader cart={cart} openDrawer={openDrawer} />

            <span className="sr-only">items in cart, view bag</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
