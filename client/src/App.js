import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here, like: */}
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
