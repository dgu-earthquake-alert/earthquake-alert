// App.jsx
import { Routes, Route } from "react-router-dom";
import Shelter from "./pages/Shelter";
import Record from "./pages/Record";
import Home from "./pages/Home";
import Rule from "./pages/Rule/Rule";
import SubPage1 from "./pages/Rule/SubPage1";
import SubPage2 from "./pages/Rule/SubPage2";

const App = () => {
  return (
    <div className="root">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shelter" element={<Shelter />} />
        <Route path="/record" element={<Record />} />
        <Route path="/rule" element={<Rule />} >
          <Route path="subpage1" element={<SubPage1 />} />
          <Route path="subpage2" element={<SubPage2 />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
