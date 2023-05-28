import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Shelter from "./pages/Shelter";
import Record from "./pages/Record";
import Home from "./pages/Home";
import Rule from "./pages/Rule/Rule";
import SubPage1 from "./pages/Rule/SubPage1";
import SubPage2 from "./pages/Rule/SubPage2";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const saveToken = () => {
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get("token");

      if (token) {
        localStorage.setItem("token", token);
        console.log("토큰 값:", token);
        // Redirect to the Home page
        navigate("/");
      }
    };

    saveToken();
  }, [location.search]);

  return (
    <div className="root">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shelter" element={<Shelter />} />
        <Route path="/record" element={<Record />} />
        <Route path="/rule" element={<Rule />}>
          <Route path="subpage1" element={<SubPage1 />} />
          <Route path="subpage2" element={<SubPage2 />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
