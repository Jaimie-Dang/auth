import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Fragment } from "react";
import { Button, Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { faBlog } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/slices/authSlice";
import { IoLogOutOutline } from "react-icons/io5";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StudentsNavbar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // Hangle Logout
  const logoutHandler = () => {
    console.log(localStorage);
    // ! Remove from localStorage
    localStorage.removeItem("userInfo");

    // ? Dispatch action
    dispatch(logoutAction());
    // Reload the page
    // window.location.reload();
    navigate("/");
  };
  return (
    <Disclosure as="nav" className="bg-white shadow fixed z-10 w-full">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <a href="/" className={styles.logo}>
                    <img src="/public/logo.png" alt="logo" />
                  </a>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/instructor-add-course"
                    className="inline-flex items-center border-b-2 hover:border-customRed px-1 pt-1 text-lg font-medium text-gray-500 hover:text-customRed"
                  >
                    Add Course
                  </Link>
                  <Link
                    to="/instructor-courses"
                    className="inline-flex items-center border-b-2 hover:border-customRed px-1 pt-1 text-lg font-medium text-gray-500 hover:text-customRed"
                  >
                    Instructor Courses
                  </Link>
                  <Link
                    to="/instructor-course-sections"
                    className="inline-flex items-center border-b-2 hover:border-customRed px-1 pt-1 text-lg font-medium text-gray-500 hover:text-customRed"
                  >
                    Instructor Course Sections
                  </Link>
                  <Link
                    to="/user"
                    className="inline-flex items-center border-b-2 hover:border-customRed px-1 pt-1 text-lg font-medium text-gray-500 hover:text-customRed"
                  >
                    Profile
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Button
                    onClick={logoutHandler}
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-customRed px-3 py-2 text-lg font-semibold text-white shadow-sm hover:!bg-white hover:!text-customRed hover:!border hover:!border-customRed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customRed animate-none"
                  >
                    <IoLogOutOutline
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Link to="/instructor-add-course">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Add Course
                </Disclosure.Button>
              </Link>
              <Link to="/instructor-courses">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Instructor Courses
                </Disclosure.Button>
              </Link>
              <Link to="/instructor-course-sections">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Instructor Course Sections
                </Disclosure.Button>
              </Link>

              <Link to="/logout">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Logout
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
