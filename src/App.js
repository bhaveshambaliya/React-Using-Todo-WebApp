import "./App.css";
import React from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import { Switch, Route } from "react-router-dom";
import HomeTodo from "./Components/Todos/HomeTodo";
import About from "./Components/About/About";
import Home from "./Components/Home/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import UserList from "./Components/UserList";
import { ToastContainer } from "react-toastify";
import Profile from "./Components/User/Profile";
import { RentHome } from "./Components/Rent/RentHome";
import AddProduct from "./Components/Product/AddProduct";
import ProductList from "./Components/Product/ProductList";
import ShopProduct from "./Components/Product/ShopProduct";
import Travell_rent from "./Components/Travelling_rent/Travell_rent";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Header title="Todo List" />
      <Switch>
        <Route path="/todo" exact component={HomeTodo} />
        <Route path="/about" component={About} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/userlist" component={UserList} />
        <Route path="/profile" component={Profile} />
        <Route path="/rent" component={RentHome} />
        <Route path="/addproduct" component={AddProduct} />
        <Route path="/productlist" component={ProductList} />
        <Route path="/shopcart" component={ShopProduct} />
        <Route path="/Travell_rent" component={Travell_rent} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />

      <ToastContainer />
    </>
  );
}

export default App;
