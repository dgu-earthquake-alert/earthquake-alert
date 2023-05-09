// App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/App.css";
import Shelter from "./pages/Shelter";
import Record from "./pages/Record";
import Home from "./pages/Home";
import "./styles/shelter/dropdown.css";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="root">
      <Header isOpen={isOpen} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shelter" element={<Shelter />} />
        <Route path="/record" element={<Record />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
