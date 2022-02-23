import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const history = useHistory();
  const inputEmailRef = useRef();

  const { login, currentUser } = useAuth();

  useEffect(() => {
    inputEmailRef.current.focus();
  }, [currentUser]);

  const loginUser = (e) => {
    e.preventDefault();

    try {
      login(Email, Password)
        .then((userCredential) => {
          // Signed in
          if (userCredential) {
            debugger
            if (userCredential.user.emailVerified == false) {
              sendEmailVerification(auth.currentUser);
            }
            toast.success("User Login Successfully");
            history.push("/home");
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(" Error while User Login :" + errorMessage);
        });
    } catch (e) {
      toast.error("Error while user is login." + e);
      history.push("/login");
    }
  };

  // console.log(" Login CurrentUser :" + JSON.stringify(currentUser));

  return (
    <>
      <div className="countiner p-5">
        <div className="row justify-content-center">
          <div className="col-md-6 ml-5 mr-5">
            <div className="section-title">
              <span>Sign in</span>
              <h2 className="text-center"> Sign in </h2>
            </div>
            <form className="shadow p-4 mt-2">
              <div className="form-group">
                <label htmlFor="Email"> Email Address </label>
                <input
                  type="text"
                  className="form-control"
                  id="Email"
                  ref={inputEmailRef}
                  value={Email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Password"> Password </label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  value={Password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <button
                disabled={(!Email, !Password)}
                type="submit"
                className="btn btn-primary w-100 my-3 justify-content-center"
                onClick={loginUser}
              >
                Submit
              </button>

              {/* <button
                className="btn btn-primary w-100 my-3 justify-content-center"
                onClick={signInWithGoogle}
              >
                Login with Google
              </button> */}

              <div className="d-flex justify-content-center links">
                Don't have an account? &nbsp;<a href="/register"> Sign Up</a>
              </div>
              {/* <div class="d-flex justify-content-center">
                  <a href="#">Forgot your password?</a>
                </div> */}
            </form>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </>
  );
}
