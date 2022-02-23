import React from "react";
import "./About.css";
import aboutimg from "../Asset/Images/about.jpg";

function About() {
  return (
    <>
      <div>
        <section id="about" className="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <img src={aboutimg} className="img-fluid" alt="img-fluid" />
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0">
                <h1 className="text-justify-center"> About </h1>
                <p className="text-justify mt-3">
                  Thoughtworks proudly and actively seeks to make itself and our
                  industry more reflective and inclusive of the society that we
                  serve, so we come to work as our whole, authentic selves. We
                  abhor and reject discrimination and inequality, and promote
                  diversity in all its forms. We encourage and support each
                  other; and value honesty and transparency. We believe ideas
                  and doing the right thing are more important than appearances
                  and backgrounds. Finding technology solutions to solve the
                  challenges facing our clients around the world is at the very
                  heart of the purpose we all share.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;
