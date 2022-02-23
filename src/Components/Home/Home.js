import React, { useEffect } from "react";
import "./Home.css";
import team1 from "../Asset/Images/team-1.jpg";
import team2 from "../Asset/Images/team-2.jpg";
import team3 from "../Asset/Images/team-3.jpg";
import { useAuth } from "../Contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { toast } from "react-toastify";

function Home() {
  const history = useHistory();
  const { currentUser } = useAuth();
  const [emailverify, setemailverify] = useState();

  // useEffect(() => {}, []);

  // if (currentUser != null) {
  //   setemailverify(currentUser.emailVerified);
  // }

  // console.log("Home CurrentUser : " + JSON.stringify(currentUser));
  //console.log(" User  emailverify:" + emailverify);

  return (
    <>
      {/* {!emailverify
        ? toast.info("Please Verify your Email address on Email")
        : null} */}
      <div>
        <section
          id="hero"
          className="d-flex align-items-center shadow BackaRandomImage"
        >
          <div
            className="container position-relative aos-init aos-animate"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="row justify-content-center">
              <div
                className="col-md-6 p-5"
                style={{
                  background: "rgb(21 55 75 / 80%)",
                }}
              >
                <h1>Welcome {currentUser && currentUser.email} </h1>
                <h2 className="text-danger">
                  {currentUser &&
                    currentUser.emailVerified == false &&
                    " Please verifiy your Email"}
                </h2>

                <h2>What We Believe In Success</h2>

                <a href="/" className="btn btn-success mt-3">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="team">
          <div className="container">
            <div className="section-title">
              <span>Team</span>
              <h2>Team</h2>
              {/* <p>
                Sit sint consectetur velit quisquam cupiditate impedit suscipit
                alias
              </p> */}
            </div>

            <div className="row">
              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch aos-init aos-animate"
                data-aos="zoom-in"
              >
                <div className="member">
                  <img src={team1} alt="" />
                  <h4>Walter White</h4>
                  <span>Chief Executive Officer</span>
                  <p>
                    Magni qui quod omnis unde et eos fuga et exercitationem.
                    Odio veritatis perspiciatis quaerat qui aut aut aut
                  </p>
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch aos-init aos-animate"
                data-aos="zoom-in"
              >
                <div className="member">
                  <img src={team2} alt="" />
                  <h4>Sarah Jhinson</h4>
                  <span>Product Manager</span>
                  <p>
                    Repellat fugiat adipisci nemo illum nesciunt voluptas
                    repellendus. In architecto rerum rerum temporibus
                  </p>
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-4 col-md-6 d-flex align-items-stretch aos-init aos-animate"
                data-aos="zoom-in"
              >
                <div className="member">
                  <img src={team3} alt="" />
                  <h4>William Anderson</h4>
                  <span>CTO</span>
                  <p>
                    Voluptas necessitatibus occaecati quia. Earum totam
                    consequuntur qui porro et laborum toro des clara
                  </p>
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="contact">
          <div className="container">
            <div className="section-title">
              <span>Contact</span>
              <h2>Contact</h2>
              {/* <p>
                Sit sint consectetur velit quisquam cupiditate impedit suscipit
                alias
              </p> */}
            </div>
            <div className="row aos-init aos-animate" data-aos="fade-up">
              <div className="col-lg-6">
                <div className="info-box mb-4">
                  <i className="fas fa-map-marker-alt"></i>
                  <h3>Our Address</h3>
                  <p>A108 Adam Street, New York, NY 535022</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="info-box  mb-4">
                  <i className="fa fa-envelope"></i>
                  <h3>Email Us</h3>
                  <p>contact@example.com</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="info-box  mb-4">
                  <i className="fas fa-phone-alt"></i>
                  <h3>Call Us</h3>
                  <p>+1 5589 55488 55</p>
                </div>
              </div>
            </div>
            <div className="row aos-init aos-animate" data-aos="fade-up">
              <div className="col-lg-6 ">
                <iframe
                  className="mb-4 mb-lg-0"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
                  frameBorder={0}
                  style={{ border: 0, width: "100%", height: 384 }}
                  allowFullScreen
                />
              </div>
              <div className="col-lg-6">
                <form
                  action="forms/contact.php"
                  method="post"
                  role="form"
                  className="php-email-form"
                >
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control"
                      name="message"
                      rows={5}
                      placeholder="Message"
                      required
                      defaultValue={""}
                    />
                  </div>
                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message" />
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
