import {Fragment, useState} from 'react';
import {Menu, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown() {
  const currencies = ['eur', 'pln', 'usd'];

  return (
    <Menu as="div" className="relative inline-block text-left text-lg">
      <div>
        <Menu.Button className="flex items-center">
          PLN zł
          <ChevronDownIcon
            className="ui-open:rotate-180 ui-open:transform -mr-1 ml-2 h-5 w-5 transition-all"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-50"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-50"
      >
        <Menu.Items className="absolute left-0 z-10 mt-[18px] w-24 origin-top-left  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {currencies.map((currency) => (
              <Menu.Item
                key={currency}
                onClick={() => handleCurrency(currency)}
              >
                {({active}) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 ',
                    )}
                  >
                    {currency === 'eur'
                      ? 'EUR €'
                      : currency === 'usd'
                      ? 'USD $'
                      : 'PLN zł'}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
