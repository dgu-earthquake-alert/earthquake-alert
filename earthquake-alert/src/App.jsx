// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Shelter from "./pages/Shelter";
import Record from "./pages/Record";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./styles/App.css";
import "./styles/shelter/dropdown.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="root">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/shelter" element={<Shelter />} />
          <Route path="/" element={<Record />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
