import React from "react";
import Navbar from "../navbar/PublicNavbar";
import Footer from "../footer/Footer";
import styles from "./Course.module.css";

const Course = () => {
  return (
    <div className="container mx-auto">
      <div className="p-20 bg-red-100">
        <div className="text-center mb-1">
          <h2 className="text-3xl font-extrabold mb-4 text-gray-800">
            Please watch the video below to learn several languages!
          </h2>
          <div className="relative w-full aspect-w-16 aspect-h-9">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/aYjGXzktatA"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Learning Languages"
            ></iframe>
          </div>
        </div>
        <div>
          <div>Answer these questions to go to the next section!</div>
          <form>
            <div className={styles.question}>
              <label htmlFor="question1">What is the capital of France?</label>
              <div className={styles.answer_options}>
                <input type="radio" id="paris" name="question1" value="paris" />
                <label htmlFor="paris">Paris</label>
                <br />
                <input
                  type="radio"
                  id="london"
                  name="question1"
                  value="london"
                />
                <label htmlFor="london">London</label>
                <br />
                <input
                  type="radio"
                  id="berlin"
                  name="question1"
                  value="berlin"
                />
                <label htmlFor="berlin">Berlin</label>
                <br />
                <input type="radio" id="rome" name="question1" value="rome" />
                <label htmlFor="rome">Rome</label>
              </div>
            </div>
            <div>
              <label htmlFor="question2">Who wrote "Romeo and Juliet"?</label>
              <div className={styles.answer_options}>
                <input
                  type="radio"
                  id="shakespeare"
                  name="question2"
                  value="shakespeare"
                />
                <label htmlFor="shakespeare">William Shakespeare</label>
                <br />
                <input
                  type="radio"
                  id="dickens"
                  name="question2"
                  value="dickens"
                />
                <label htmlFor="dickens">Charles Dickens</label>
                <br />
                <input
                  type="radio"
                  id="austen"
                  name="question2"
                  value="austen"
                />
                <label htmlFor="austen">Jane Austen</label>
                <br />
                <input type="radio" id="twain" name="question2" value="twain" />
                <label htmlFor="twain">Mark Twain</label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit Answers
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Course;
