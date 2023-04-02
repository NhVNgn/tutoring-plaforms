import React from "react";
import "./css/home.css";

const About = () => {
  return (
    <>
      <div className="wrapper">
        <title>About</title>
        <main className="about">
          <section>
            <h1>About Us</h1>
            <div className="separator"></div>
            <p>365Tutor is an online tutoring platform that connects students with highly qualified tutors. 
              Our mission is to help students achieve their academic goals by providing personalized, one-on-one tutoring sessions that cater to their unique learning needs.</p>
            <p>Our tutors are subject-matter experts who have years of experience in their respective fields. 
              They have helped thousands of students improve their grades, gain confidence, and succeed in their academic pursuits.</p>
          </section>

          <section>
            <h2>How it works</h2>
            <ol>
              <li>Create an account: Sign up for a 365Tutor account and provide your basic information.</li>
              <li>Enrol in a course: Browse through our list of courses and select the one that best fits your needs.</li>
              <li>Book a session: Chat with your tutor for the course to book a session and get help as needed.</li>
            </ol>
          </section>

          <section>
            <h2>Our Promise</h2>
            <ul>
              <li>Expert tutors: All of our tutors are highly qualified subject-matter experts who have years of experience in their respective fields.</li>
              <li>Personalized sessions: We understand that every student has unique learning needs, which is why our tutors provide personalized, 
              one-on-one sessions tailored to your specific needs.</li>
              <li>Flexible scheduling: We offer flexible scheduling options to accommodate your busy schedule.</li>
              <li>Affordable pricing: Our pricing is competitive and affordable, so you can get the help you need without breaking the bank.</li>
              <li>100% satisfaction guarantee: We are committed to your success, which is why we offer a 100% satisfaction guarantee. 
                If you're not satisfied with your session, we'll refund your money.</li>
            </ul>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>Have a question or need help? Contact our customer support team at <a href="mailto:support@365tutor.com">support@365tutor.com</a> or 
              give us a call at <a href="tel:1-800-123-4567">1-800-123-4567</a>.</p>
          </section>

          <section id="faqs">
            <h2>Frequently Asked Questions</h2>
            <dl>
              <dt>What subjects do you offer tutoring in?</dt>
              <dd>Our online tutoring platform offers a wide range of subjects, including math, science, history, English, and more. 
                Simply browse our selection of courses to find the subject you need help with.</dd>
              
              <dt>How do I schedule a tutoring session?</dt>
              <dd>Scheduling a tutoring session is easy. Simply log in to your account and browse our list of available courses. 
                Once you find a course that fits your needs, you can schedule a session directly by chatting with the tutor.</dd>
            </dl>
          </section>
        </main>
      </div>
    </>
  )
};

export default About;