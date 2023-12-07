import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingPage from "./BookingPage";
import BookingSystem from "./BookingSystem";
import Header from "./Header";
import Profile from "./Profile";
import AppointmentType from "./AppointmentType";
import FAQ from "./FAQ";
import "./App.css";

const Mainpage = () => (
  <div className="bg-gray-100" style={{ paddingTop: "60px" }}>
    <Header />
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "70%", backgroundColor: "white" }}>
        <Profile />
        <BookingPage />
        <FAQ />
      </div>
    </div>
  </div>
);

const Book = () => (
  <div className="bg-gray-100" style={{ paddingTop: "60px" }}>
    <Header />
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "70%", backgroundColor: "white" }}>
        <Profile />
        <BookingSystem />
        <FAQ />
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/booking/:date/:time/:type" element={<Book />} />
      </Routes>
    </Router>
  );
}

export default App;
