import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoogleMap from "./components/Googlemap";
import "./styles/App.css";


function App() {
  return (
    <div className="root">
      <Header />
      <main>
        <div className="map_title">내 주변 대피소를 찾아보세요</div>
        <div className="map">
        <GoogleMap />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;