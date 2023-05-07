import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GoogleMap from "../components/GoogleMap";
import "../styles/App.css";
import "../styles/Sidebar.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  return (
    <div>
      <div className="root">
        <Header isOpen={isOpen} />
        <button
          className={`bookmark_button ${isOpen ? "open" : ""}`}
          onClick={toggleSidebar}
        >
          ⭐
        </button>
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          {/* <div className="bookmark_add">+</div>
          <div className="bookmark_remove">-</div> */}
        </div>
        <main className={`main ${isOpen ? "open" : ""}`}>
          <div className="map_title">내 주변 대피소를 찾아보세요</div>
          <div className="map">
            <GoogleMap />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
