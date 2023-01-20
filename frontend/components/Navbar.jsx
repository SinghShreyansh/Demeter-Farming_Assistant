import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div>
                <nav className="bg-cyan-900">
                    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className=" h-25 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 ">
                                    <Link href="/">
                                        <a className="flex items-center">
                                            <Image
                                                src="https://res.cloudinary.com/atharva7/image/upload/v1664640503/samples/plantifylogo_ez5l1p.png"
                                                className="mr-3 h-12 animate-pulse sm:h-24"
                                                height={95}
                                                width={95}
                                                alt="Demeter Logo"
                                            />
                                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                                Demeter
                                            </span>
                                        </a>
                                    </Link>
                                </div>
                                <div
                                    className="hidden w-full md:block md:w-auto"
                                    id="mobile-menu"
                                >
                                    <ul className="absolute right-0 top-7 flex flex-col rounded-lg border border-gray-100 bg-gray-50 mr-7 mb-3 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-cyan-900">
                                        <li>
                                            <Link href="/">
                                                <a
                                                    className="duration-0 block rounded py-2 pr-4 pl-3 text-xl text-gray-100 transition hover:scale-125 hover:bg-gray-100 hover:duration-150 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                                                    aria-current="page"
                                                >
                                                    Home
                                                </a>
                                            </Link>
                                        </li>
                                        {/* <li>
                                            <a
                                                href="#"
                                                className="block rounded py-2 pr-4 pl-3 text-2xl text-gray-700 hover:scale-125 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                                            >
                                                About Us
                                            </a>
                                        </li> */}
                                        <li>
                                            <Link href="/Disease">
                                                <a className="duration-0 block rounded py-2 pr-4 pl-3 text-xl text-gray-100 transition hover:scale-125 hover:bg-gray-100 hover:duration-150 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                                    Disease
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/Crop">
                                                <a className="duration-0 block rounded py-2 pr-4 pl-3 text-xl text-gray-100 transition hover:scale-125 hover:bg-gray-100 hover:duration-150 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                                    Crop
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/Fertilizer">
                                                <a className="duration-0 block rounded py-2 pr-4 pl-3 text-xl text-gray-100 transition hover:scale-125 hover:bg-gray-100 hover:duration-150 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                                    Fertilizer
                                                </a>
                                            </Link>
                                        </li>
                                        {/* <li>
                                            <a
                                                href="/Profit"
                                                className="duration-0 block rounded py-2 pr-4 pl-3 text-xl text-gray-100 transition hover:scale-125 hover:bg-gray-100 hover:duration-150 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                                            >
                                                Profit
                                            </a>
                                        </li> */}
                                        <li>
                                            <Link href="/Weather">
                                                <a className="duration-0 block rounded py-2 pr-4 pl-3 text-xl text-gray-100 transition hover:scale-125 hover:bg-gray-100 hover:duration-150 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                                    Weather
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="-mr-2 flex">
                                {/* <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    type="button"
                                    className="inline-flex items-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    aria-controls="mobile-menu"
                                    aria-expanded="false"
                                > */}
                                <button
                                    data-collapse-toggle="navbar-default"
                                    onClick={() => setIsOpen(!isOpen)}
                                    type="button"
                                    class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                    aria-controls="navbar-default"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {!isOpen ? (
                                        <svg
                                            className="block h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="block h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <Transition
                        show={isOpen}
                        enter="transition ease-out duration-100 transform"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-75 transform"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        {(ref) => (
                            <div className="md:hidden" id="mobile-menu">
                                <div
                                    ref={ref}
                                    className="space-y-1 px-2 pt-2 pb-3 sm:px-3"
                                >
                                    <Link href="/">
                                        <a className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700">
                                            Home
                                        </a>
                                    </Link>

                                    {/* <a
                                        href="#"
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        About Us
                                    </a> */}

                                    <Link href="/Disease">
                                        <a className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Disease
                                        </a>
                                    </Link>

                                    <Link href="/Crop">
                                        <a className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Crop
                                        </a>
                                    </Link>

                                    <Link href="/Fertilizer">
                                        <a className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Fertilizer
                                        </a>
                                    </Link>
                                    {/* <a
                                        href="/Profit"
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        Profit
                                    </a> */}

                                    <Link href="/Weather">
                                        <a className="duration-0 block rounded py-2 pr-4 pl-3 text-xl text-gray-100 transition hover:scale-125 hover:bg-gray-100 hover:duration-150 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                            Weather
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </Transition>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
