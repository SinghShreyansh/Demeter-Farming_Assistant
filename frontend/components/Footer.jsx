import React from "react";

const Footer = () => {
    return (
        <div>
            <div className="fixed bottom-0 left-0 z-20 p-4 w-full bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-cyan-900 dark:border-gray-600">
                <span className="text-l text-white sm:text-center dark:text-white">
                    © 2022{" "}
                    <a href="#" className="hover:underline">
                        Demeter™
                    </a>
                    . All Rights Reserved.
                </span>

                <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li className="text-sm mr-4 md:mr-2">24 Hour helpline</li>{" "}
                    <li className="text-sm mr-4 hover:underline md:mr-2">
                        <a href="tel:+919137473145">
                            <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-phone-web-flaticons-flat-flat-icons-3.png" />
                        </a>
                    </li>
                    <li className="text-sm mr-4 hover:underline md:mr-6">
                        <a href="tel:+919137473145">+91 9137473145</a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-sm mr-4 hover:underline md:mr-6"
                        >
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">
                            Licensing
                        </a>
                    </li>
                    {/* <li>
                        <a href="#" className="hover:underline">
                            Contact
                        </a>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default Footer;
