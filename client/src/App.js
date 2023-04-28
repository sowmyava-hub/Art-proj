import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListItems from "./ListItems";
import Home from "./Home";
import SellAnItem from "./SellAnItem";

const App = () => {
  return (
    <div style={styles.app}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<SellAnItem />} />
          <Route path="/list" element={<ListItems />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

const styles = {
  app: {
    padding: 50,
  },
};