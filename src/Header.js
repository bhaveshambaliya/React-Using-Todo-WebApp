import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./Components/Contexts/AuthContext";
import { toast } from "react-toastify";
import { useState } from "react/cjs/react.development";
import { db } from "../src/firebase";

const Header = (props) => {
  const { currentUser, logout, AddProducts } = useAuth();
  const history = useHistory();
  const [EmailVerfiedUser, setEmailVerfiedUser] = useState(false);

  useEffect(() => {
    if (currentUser != null && AddProducts != null) {
      setEmailVerfiedUser(currentUser.emailVerified);
    }
  }, [currentUser, AddProducts]);

  const LogoutUser = (e) => {
    e.preventDefault();
    try {
      logout().then(
        setEmailVerfiedUser(false),
        toast.success("User Logout Successfully"),
        history.push("/home")
      );
    } catch {
      toast.error("Error while logout user...!");
    }
  };

  //console.log("Header CurrentUser :" + JSON.stringify(currentUser));
  //console.log("Header CurrentUser Email verified :" + EmailVerfiedUser);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            {props.title}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {EmailVerfiedUser === true ||
              (currentUser && currentUser.email === "admin@gmail.com") ? (
                <>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/todo">
                      Todo
                    </Link>
                  </li>
                  {currentUser && currentUser.email === "admin@gmail.com" ? (
                    <li className="nav-item">
                      <Link className="nav-link" to="/userlist">
                        Userlist
                      </Link>
                    </li>
                  ) : null}

                  <li className="nav-item">
                    <Link className="nav-link" to="/rent">
                      Rent
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Travell_rent">
                    Travell_rent
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/productlist"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Product
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link className="dropdown-item" to="/addproduct">
                        Add Product
                      </Link>
                      <Link className="dropdown-item" to="/productlist">
                        List of Product
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/about">
                      About
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">
                      About
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="d-flex ml-auto">
              {!currentUser ? (
                <>
                  <button
                    className="btn btn-light login "
                    onClick={() => history.push("/register")}
                  >
                    <i className="fa fa-sign-in-alt"></i> Register
                  </button>
                  <button
                    className="btn btn-light login ml-2"
                    onClick={() => history.push("/login")}
                  >
                    <i className="fa fa-sign-in-alt"></i>&nbsp; Login
                  </button>
                </>
              ) : (
                <>
                  <Link className="nav-link" to="/shopcart">
                    <i className="fas fa-shopping-basket">{AddProducts}</i>
                    &nbsp;
                    {/* {currentUser && currentUser.email} */}
                  </Link>
                  <Link className="nav-link" to="/profile">
                    <i className="fa fa-user" aria-hidden="true"></i> &nbsp;
                    {currentUser && currentUser.email}
                  </Link>
                  <button
                    className="btn btn-light login mr-2"
                    //onClick={() => signOut().then(alert("Sigout Succesfully"))}
                    onClick={LogoutUser}
                  >
                    <i className="fa fa-sign-out-alt"></i>&nbsp; Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

Header.defaultProps = {
  title: "Your Title Here",
};

Header.prototype = {
  title: PropTypes.string,
};
