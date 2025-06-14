import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from "axios";

const Dashboard = () => {
  const [pools, setPools] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchPools = async () => {
      try {
        console.log(userId);
        const response = await fetch(`/api/mypools/${userId}`);
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Actions</th>
              <th>Pool Name</th>
              <th>Style</th>
              <th>Max Pot</th>
            </tr>
          </thead>
          <tbody>
  {pools.map((pool) => {
    console.log('pool id:', pool.id, 'commissionerid:', pool.commissionerid, 'userId:', userId);

    return (
      <tr key={pool.id}>
        <td className="d-flex gap-2">
          <button 
            className="btn btn-sm btn-warning" 
            onClick={() => navigate(`/draftroom/${pool.id}`)}
          >
            Enter Draft Room
          </button>

          {String(userId) === String(pool.commissionerid) && (
            <button 
              className="btn btn-sm btn-success" 
              onClick={() => navigate(`/editpool/${pool.id}`)}
            >
              Edit Pool
            </button>
          )}
          {String(userId) === String(pool.commissionerid) && (
            <button 
              className="btn btn-sm btn-danger" 
              onClick={async () => {
                const confirmed = window.confirm("Are you sure you wish to delete this pool?");
                if (confirmed) {
                  try {
                    const res = await axios.delete(`/api/deletepool/${pool.id}`);
                    if (res.status === 200) {
                      alert("Pool deleted successfully.");
                      // Optionally reload or navigate
                      window.location.reload(); // or navigate('/mypoolsdashboard');
                    }
                  } catch (err) {
                    console.error("Delete error:", err.response?.data || err.message);
                    alert("Failed to delete the pool.");
                  }
                }
              }}
            >
              Delete Pool
            </button>
          )}
        </td>
        <td>{pool.poolname}</td>
        <td>{pool.poolstyle}</td>
        <td>{pool.maxpot}</td>
      </tr>
    );
  })}
</tbody>

        </table>
      ) : (
        <p>No pools found.</p>
      )}
    </div>
  );
};

export default Dashboard;
