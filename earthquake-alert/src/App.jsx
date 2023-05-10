// App.jsx
import { Routes, Route } from "react-router-dom";
import Shelter from "./pages/Shelter";
import Record from "./pages/Record";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="root">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shelter" element={<Shelter />} />
        <Route path="/record" element={<Record />} />
      </Routes>
    </div>
  );
};

export default App;
