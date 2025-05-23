import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"; 
import axios from "axios";

const Dashboard = () => {
  const [pools, setPools] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // This gets the :id from the route

  const userId = localStorage.getItem('userId'); 

  return (
    <h2>Draft Room - User ID: {userId} | Pool ID: {id}</h2>
  );
};

export default Dashboard;
