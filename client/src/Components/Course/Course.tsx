// import React from "react";
// import Navbar from "../navbar/PublicNavbar";
// import Footer from "../footer/Footer";
// import styles from "./Course.module.css";

// const Course = () => {
//   return (
//     <div className="container mx-auto">
//       <div className="p-20 bg-red-100">
// <div className="text-center">
//   <h2 className="text-3xl font-extrabold mb-4 text-gray-800">
//     Please watch the video below to learn several languages!
//   </h2>
//   <div className={styles.video_container}>
//     <iframe
//       className={styles.video_iframe}
//       src="https://www.youtube.com/embed/aYjGXzktatA"
//       frameBorder="0"
//       allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//       allowFullScreen
//       title="Learning Languages"
//     ></iframe>
//   </div>
// </div>
// <div className="flex flex-col justify-between w-full p-4 bg-red-50 rounded-lg mt-20">
//   <div className="text-xl font-semibold text-gray-800 pb-3">
//     Answer these questions to go to the next section!
//   </div>
//   <form className="">
//     <div className="">
//       <label className="block" htmlFor="question1">
//         1. Tiếng việt của từ: "object-oriented database" là gì
//       </label>
//       <div className="mt-2">
//         <input
//           type="radio"
//           id="paris"
//           name="question1"
//           value="paris"
//           className="mr-2"
//         />
//         <label htmlFor="paris">Ngôn ngữ lập trình </label>
//         <br />
//         <input
//           type="radio"
//           id="london"
//           name="question1"
//           value="london"
//           className="mr-2"
//         />
//         <label htmlFor="london">Lập trình hướng đối tượng</label>
//         <br />
//         <input
//           type="radio"
//           id="berlin"
//           name="question1"
//           value="berlin"
//           className="mr-2"
//         />
//         <label htmlFor="berlin">Cơ sở dữ liệu hướng đối tượng</label>
//         <br />
//         <input
//           type="radio"
//           id="rome"
//           name="question1"
//           value="rome"
//           className="mr-2"
//         />
//         <label htmlFor="rome">Ngôn ngữ máy tính</label>
//       </div>
//     </div>
//     <div className="mt-4">
//       <label className="block" htmlFor="question2">
//         2. Hãy dịch từ "assmbly language" sang tiếng việt:
//       </label>
//       <input
//         type="text"
//         id="question2"
//         name="question2"
//         className="mr-2"
//         placeholder="Type here"
//       />
//     </div>
//     <div className="mt-4">
//       <label className="block" htmlFor="question2">
//         2. Hãy viết tiếng anh với từ "lập trình là sự tương tác của các
//         chức năng giữa các đối tượng":
//       </label>
//       <input
//         type="text"
//         id="question3"
//         name="question3"
//         className="mr-2"
//         placeholder="Type here"
//       />
//     </div>
//     <div className="mt-4">
//       <button
//         type="submit"
//         className="relative inline-flex items-center gap-x-1.5 rounded-md bg-customRed px-3 py-2 text-sm font-semibold text-white shadow-sm hover:!bg-white hover:!text-customRed hover:!border hover:!border-customRed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customRed animate-none"
//       >
//         Submit Answers
//       </button>
//     </div>
//   </form>
// </div>
//       </div>
//     </div>
//   );
// };

// export default Course;

import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar/PublicNavbar";
import Footer from "../footer/Footer";
import styles from "./Course.module.css";

const Reading = () => (
  <div>
    <div className="text-center">
      <h2 className="text-3xl font-extrabold mb-4 text-gray-800">
        Reading Section
      </h2>
      <div className="flex flex-col justify-between w-full p-4 bg-red-50 rounded-lg mt-20">
        <div className="text-xl font-semibold text-gray-800 pb-3">
          Read the following passage and answer the questions below to go to the
          next section!
        </div>
        <form>
          <div>
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
    <div className="text-center">
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
  const typeSection = useSelector((state) => state?.course?.typeSection);

  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="p-20 bg-red-100">
        {typeSection === "reading" ? <Reading /> : <Listening />}
      </div>
    </div>
  );
};

export default Course;
