import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import SignUpPage from './components/SignUpPage/SignUpPage';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import AboutPage from './components/AboutPage/AboutPage';
import ServicesPage from './components/ServicesPage/ServicesPage';
import ContactPage from './components/ContactPage/ContactPage';
import QRCodeForm from './components/QRCodeForm/QRCodeForm';
import UserContext from './UserContext/store';
import PetSelling from './components/PetSelling/PetSelling';
import LostPet from './components/LostPet/LostPet';
import PetMap from './components/PetMap/PetMap';
import OrderPage from './components/OrderPage/OrderPage';
import OrderSummary from './components/OrderSummary/OrderSummary';
import UserProfile from './components/UserProfile/UserProfile';
import EditProfile from './components/EditProfile/EditProfile';

function App() {
  const [userInfo, setUserInfo] = useState();
  console.log("userInfo:::", userInfo);

  useEffect(() => {
    let userData = JSON.parse(window.sessionStorage.getItem("userData"));
    userData = {
      ...userData,
      name: userData?.name.split(" ")[0]
    };
    if (userData) {
      setUserInfo(userData);
    }
  }, []);

  return (
    <Router>
      <UserContext.Provider value={userInfo}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/services" element={<ServicesPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/register" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/user-profile" element={<UserProfile />}></Route>
          <Route path="/edit-profile" element={<EditProfile />}></Route>
          <Route path="/services/get-qr-code" element={<QRCodeForm />}></Route>
          <Route path="/services/pet-selling" element={<PetSelling />}></Route>
          <Route path="/services/pet-selling/place-order" element={<OrderPage />}></Route>
          <Route path="/services/pet-selling/order-summary" element={<OrderSummary />}></Route>
          <Route path="/lost-pet/:id" element={<LostPet />}></Route>
          <Route path="/pet-map/:locationParams" element={<PetMap />}></Route>
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
