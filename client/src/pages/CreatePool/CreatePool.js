import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";  // Import useNavigate for React Router v6
import axios from 'axios';

const CreatePool = () => {
  const location = useLocation();
  const navigate = useNavigate();  // Get the navigate function
  const poolStyle = location.state?.poolStyle || "Unknown Style";
  const [form, setForm] = useState({
    poolName: '',
    maxPot: ''
  });

  // Assuming the user ID is stored in localStorage under 'userId'
  const userId = localStorage.getItem('userId');  // Or get from the auth context or session if it's stored elsewhere

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("In the front end call");
    e.preventDefault();
    try {
      const res = await axios.post('/api/createpool/create', {
        poolName: form.poolName,
        poolStyle,
        maxPot: form.maxPot,
        commissionerId: userId  // Send the logged-in user's ID
      });

      if (res.status === 201) {
        alert('Pool created successfully');
        navigate('/mypoolsdashboard');  // Redirect to the home page or any other page
      }
    } catch (err) {
      console.error("Error creating pool:", err.response?.data || err.message);
      alert('Failed to create pool');
    }
    
  };

  return (
    <div className="container mt-5">
      <h2>Create Pool</h2>
      <p>When creating a pool, you become the commissioner of your pool.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="poolName" className="form-label">Pool Name</label>
          <input
            type="text"
            className="form-control"
            id="poolName"
            name="poolName"
            value={form.poolName}
            onChange={handleChange}
            placeholder="Enter pool name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="poolStyle" className="form-label">Pool Style</label>
          <input
            type="text"
            className="form-control"
            id="poolStyle"
            value={poolStyle}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label htmlFor="maxPot" className="form-label">Max Pot</label>
          <input
            type="number"
            className="form-control"
            id="maxPot"
            name="maxPot"
            value={form.maxPot}
            onChange={handleChange}
            placeholder="Enter max pot"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Create Pool</button>
      </form>
    </div>
  );
};

export default CreatePool;
