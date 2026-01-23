import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product"; 
import Cart from "./pages/Cart";
import Login from "./pages/Login"
import Placeorder from "./pages/Placeorder";
import Order from "./pages/Order";
import LatestCollection from "./components/LatestCollection";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[5vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/orders" element={<Order />}/>
        <Route path="/place-order" element={<Placeorder />}/>
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
