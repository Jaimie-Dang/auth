import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar/PublicNavbar";
import Footer from "../footer/Footer";
import styles from "./Course.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllCourseSectionAPI } from "../../services/courseSections/courseSectionServices";
import {
  getSingleCoursesAPI,
  startCoursesAPI,
} from "../../services/courses/courseServices";

const Reading = () => (
  <div>
    <div>
      <h2 className="text-3xl text-center font-extrabold mb-4 text-gray-800">
        Reading Section
      </h2>
      <div className="text-xl text-center font-semibold text-gray-800 pb-3">
        Read the following passage and answer the questions below to go to the
        next section!
      </div>
      <div>
        <h2 className="text-2xl text-center font-semibold text-red-800 pb-3">
          Introduction to Information Technology
        </h2>
        <div className="text-xl">
          <p>
            For as long as there has been computer hardware, there has also been
            computer software. But what is software? Software is just
            instructions written by a programmer which tells the computer what
            to do. Programmers are also known as 'software developers', or just
            plain 'developers'.
          </p>
          <p>
            Nothing much is simple about software. Software programs can have
            millions of lines of code. If one line doesn't work, the whole
            program could break! Even the process of starting software goes by
            many different names in English. Perhaps the most correct technical
            term is 'execute', as in "the man executed the computer program." Be
            careful, because the term 'execute' also means (in another context)
            to put someone to death! Some other common verbs used to start a
            software program you will hear are 'run', 'launch, and even 'boot'
            (when the software in question is an operating system).
          </p>
          <p>
            Software normally has both features and bugs. Hopefully more of the
            former than the latter! When software has a bug there are a few
            things that can happen. The program can crash and terminate with a
            confusing message. This is not good. End users do not like confusing
            error messages such as:
          </p>
          <p>
            Site error: the file
            /home7/businfc6/public_html/blog/wordpress/wp-content/plugins/seo-blog/core.php
            requires the ionCube PHP Loader ioncube_loader_lin_5.2.so to be
            installed by the site administrator.
          </p>
          <p>
            Sometimes when software stops responding you are forced to manually
            abort the program yourself by pressing some strange combination of
            keys such as ctrl-alt-delete.
          </p>
          <p>
            Because of poor usability, documentation, and strange error
            messages, programming still seems very mysterious to most people.
            That's too bad, because it can be quite fun and rewarding to write
            software. To succeed, you just have to take everything in small
            steps, think very hard, and never give up.
          </p>
          <p>
            I think everyone studying Information Technology should learn at
            least one programming language and write at least one program. Why?
            Programming forces you to think like a computer. This can be very
            rewarding when dealing with a wide range of IT-related issues from
            tech support to setting up PPC (pay-per-click) advertising campaigns
            for a client's web site. Also, as an IT professional, you will be
            dealing with programmers on a daily basis. Having some understanding
            of the work they do will help you get along with them better.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full p-4 bg-red-50 rounded-lg mt-20">
        <form className="">
          <div className="">
            <label className="block" htmlFor="question1">
              1. What is the meaning of "object-oriented database" in
              Vietnamese?
            </label>
            <div className="mt-2">
              <input
                type="radio"
                id="option1"
                name="question1"
                value="option1"
                className="mr-2"
              />
              <label htmlFor="option1">Ngôn ngữ lập trình</label>
              <br />
              <input
                type="radio"
                id="option2"
                name="question1"
                value="option2"
                className="mr-2"
              />
              <label htmlFor="option2">Lập trình hướng đối tượng</label>
              <br />
              <input
                type="radio"
                id="option3"
                name="question1"
                value="option3"
                className="mr-2"
              />
              <label htmlFor="option3">Cơ sở dữ liệu hướng đối tượng</label>
              <br />
              <input
                type="radio"
                id="option4"
                name="question1"
                value="option4"
                className="mr-2"
              />
              <label htmlFor="option4">Ngôn ngữ máy tính</label>
            </div>
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="question2">
              2. Translate the term "assembly language" into Vietnamese:
            </label>
            <input
              type="text"
              id="question2"
              name="question2"
              className="mr-2"
              placeholder="Type here"
            />
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="question3">
              3. Translate this sentence into English: "lập trình là sự tương
              tác của các chức năng giữa các đối tượng":
            </label>
            <input
              type="text"
              id="question3"
              name="question3"
              className="mr-2"
              placeholder="Type here"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="relative inline-flex items-center gap-x-1.5 rounded-md bg-customRed px-3 py-2 text-sm font-semibold text-white shadow-sm hover:!bg-white hover:!text-customRed hover:!border hover:!border-customRed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customRed animate-none"
            >
              Submit Answers
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

const Listening = () => (
  <div>
    <div className="">
      <h2 className="text-3xl font-extrabold mb-4 text-gray-800">
        Please watch the video below to learn several languages!
      </h2>
      <div className={styles.video_container}>
        <iframe
          className={styles.video_iframe}
          src="https://www.youtube.com/embed/aYjGXzktatA"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Learning Languages"
        ></iframe>
      </div>
    </div>
    <div className="flex flex-col justify-between w-full p-4 bg-red-50 rounded-lg mt-20">
      <div className="text-xl font-semibold text-gray-800 pb-3">
        Answer these questions to go to the next section!
      </div>
      <form className="">
        <div className="">
          <label className="block" htmlFor="question1">
            1. Tiếng việt của từ: "object-oriented database" là gì
          </label>
          <div className="mt-2">
            <input
              type="radio"
              id="paris"
              name="question1"
              value="paris"
              className="mr-2"
            />
            <label htmlFor="paris">Ngôn ngữ lập trình </label>
            <br />
            <input
              type="radio"
              id="london"
              name="question1"
              value="london"
              className="mr-2"
            />
            <label htmlFor="london">Lập trình hướng đối tượng</label>
            <br />
            <input
              type="radio"
              id="berlin"
              name="question1"
              value="berlin"
              className="mr-2"
            />
            <label htmlFor="berlin">Cơ sở dữ liệu hướng đối tượng</label>
            <br />
            <input
              type="radio"
              id="rome"
              name="question1"
              value="rome"
              className="mr-2"
            />
            <label htmlFor="rome">Ngôn ngữ máy tính</label>
          </div>
        </div>
        <div className="mt-4">
          <label className="block" htmlFor="question2">
            2. Hãy dịch từ "assmbly language" sang tiếng việt:
          </label>
          <input
            type="text"
            id="question2"
            name="question2"
            className="mr-2"
            placeholder="Type here"
          />
        </div>
        <div className="mt-4">
          <label className="block" htmlFor="question2">
            2. Hãy viết tiếng anh với từ "lập trình là sự tương tác của các chức
            năng giữa các đối tượng":
          </label>
          <input
            type="text"
            id="question3"
            name="question3"
            className="mr-2"
            placeholder="Type here"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="relative inline-flex items-center gap-x-1.5 rounded-md bg-customRed px-3 py-2 text-sm font-semibold text-white shadow-sm hover:!bg-white hover:!text-customRed hover:!border hover:!border-customRed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customRed animate-none"
          >
            Submit Answers
          </button>
        </div>
      </form>
    </div>
  </div>
);

const Course = () => {
  // Use useSelector to retrieve typeSection from the Redux store
  const { sectionId } = useParams();
  console.log("Test section: ", sectionId);

  // Use Selector
  const userData = useSelector((state) => state?.auth?.user);
  const token = userData?.token;

  // UseQuery
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["get-course-sections"],
    queryFn: () => getAllCourseSectionAPI(token),
  });

  console.log(data);

  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="p-20 bg-red-100">
        {data?.map((section) => {
          if (section._id === sectionId) {
            return section.typeSection === "Reading" ? (
              <Reading key={section._id} />
            ) : (
              <Listening key={section._id} />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Course;
