import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CreatePoolDashboard from "./pages/CreatePool/Dashboard";
import CreatePool from "./pages/CreatePool/CreatePool";
import MyPools from "./pages/MyPools";
import JoinPool from "./pages/JoinPool";
import Login from "./pages/Account/Login";
import Register from "./pages/Account/Register";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/mypools" element={<MyPools />} />
          <Route path="/joinpool" element={<JoinPool />} />
          <Route path="/createpooldashboard" element={<CreatePoolDashboard />} />
          <Route path="/createpool" element={<CreatePool />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
