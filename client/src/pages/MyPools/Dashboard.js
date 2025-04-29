import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // still good to have
import { useLocation, useNavigate } from "react-router-dom";  // Import useNavigate for React Router v6
import axios from 'axios';

const Dashboard = () => {
  const [pools, setPools] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();  // Get the navigate function

  const userId = localStorage.getItem('userId'); 
  useEffect(() => {
    const fetchPools = async () => {
      try {
        const response = await fetch(`/api/mypools/${userId}`); // adjust the URL if needed
        const data = await response.json();
        setPools(data);
      } catch (error) {
        console.error('Error fetching pools:', error);
      }
    };

    fetchPools();
  }, [userId]);

  return (
    <div>
      <h2>My Pools</h2>
      {pools.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Pool Name</th>
              <th>Style</th>
              <th>Max Pot</th>
            </tr>
          </thead>
          <tbody>
            {pools.map((pool) => (
              <tr key={pool.id}>
                <td>{pool.poolname}</td>
                <td>{pool.poolstyle}</td>
                <td>{pool.maxpot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pools found.</p>
      )}
    </div>
  );
};

export default Dashboard;
