import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
export default function Navbar() {
  return (
    <Popover>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav
          className="relative flex items-center justify-between sm:h-10 lg:justify-start"
          aria-label="Global"
        >
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <Image
                  src="/logo.png"
                  alt="Rentool Logo"
                  width={250}
                  height={60}
                />
              </a>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-800">
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            <Link href="/login">
              <a className="font-medium text-blue-800 hover:text-blue-800">
                Log in
              </a>
            </Link>
            <Link href="/signup">
              <a className="font-medium text-blue-800 hover:text-blue-800">
                Sign up
              </a>
            </Link>
            <Link href="/new-listing">
              <a className="font-medium text-blue-800 hover:text-blue-800">
                Publicar una herramienta
              </a>
            </Link>
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-800">
                  <span className="sr-only">Close main menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <Link href="/login">
              <a className="block w-full px-5 py-3 text-center font-medium text-blue-800 bg-gray-50 hover:bg-gray-100">
                Log in
              </a>
            </Link>
            <Link href="/signup">
              <a className="block w-full px-5 py-3 text-center font-medium text-blue-800 bg-gray-50 hover:bg-gray-100">
                Sign up
              </a>
            </Link>
            <Link href="/new-listing">
              <a className="block w-full px-5 py-3 text-center font-medium text-blue-800 bg-gray-50 hover:bg-gray-100">
                Publicar una herramienta
              </a>
            </Link>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
