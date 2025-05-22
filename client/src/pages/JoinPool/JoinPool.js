import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from "axios";

const JoinPool = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const userId = localStorage.getItem('userId');

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/searchpools?name=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Join Pool</h2>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search pool by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {results.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th></th>
                <th>Pool Name</th>
                <th>Style</th>
                <th>Max Pot</th>
              </tr>
            </thead>
            <tbody>
              {results.map((pool) => (
                <tr key={pool.id}>
                  <td>
                    <button 
                      className="btn btn-sm btn-primary" 
                      onClick={async () => {
                          try {
                            const res = await axios.put(`/api/pooljoin/join/${pool.id}/${userId}`);
                            if (res.status === 200) {
                              alert("You have joined pool");
                              // Optionally reload or navigate
                              window.location.reload(); // or navigate('/mypoolsdashboard');
                            }
                          } catch (err) {
                            console.error("Join error:", err.response?.data || err.message);
                            alert("Failed to join pool");
                          }
                      }}
                    >
                      Join Pool
                    </button>
                  </td>
                  <td>{pool.poolname}</td>
                  <td>{pool.poolstyle}</td>
                  <td>{pool.maxpot.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted">No pools found.</p>
      )}
    </div>
  );
};

export default JoinPool;
