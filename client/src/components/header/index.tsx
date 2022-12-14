import React, { SetStateAction, Dispatch } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3BottomLeftIcon, BellIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/user";
import { useAppSelector } from "../../store";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  search?: {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
  };
};

const Header = ({ setSidebarOpen, search }: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { value: user, status: useStatus } = useAppSelector(
    (state) => state.user
  );

  const userNavigation = [
    {
      name: "Cerrar sesión",
      onClick: () => {
        dispatch(signOut());
        navigate("/login", { replace: true });
      },
    },
  ];

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-esan-color md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex flex-1 justify-between px-4">
        <div className="flex flex-1">
          {search && (
            <form
              className="flex w-full md:ml-0"
              onSubmit={(e) => e.preventDefault()}
              method="GET"
            >
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search-field"
                  value={search?.search}
                  onChange={(e) =>
                    search ? search?.setSearch(e.target.value) : {}
                  }
                  className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </form>
          )}
        </div>

        <div className="ml-4 flex items-center md:ml-6">
          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-esan-color focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  <span className={"block px-4 py-2 text-sm text-gray-700"}>
                    {user?.email}
                  </span>
                </Menu.Item>
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <span
                        onClick={item.onClick}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        {item.name}
                      </span>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
