import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPool = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // pool ID from URL
  const [form, setForm] = useState({
    poolName: '',
    maxPot: ''
  });
  const [poolStyle, setPoolStyle] = useState(''); // fetched separately
  const userId = localStorage.getItem('userId'); // current user ID

  // Fetch pool data on load
  useEffect(() => {
    const fetchPool = async () => {
      try {
        const res = await axios.get(`/api/editpool/edit/${id}`);
        const data = res.data;

        setForm({
          poolName: data.poolname || '',
          maxPot: data.maxpot || ''
        });
        setPoolStyle(data.poolstyle || 'Unknown');
      } catch (err) {
        console.error("Error fetching pool data:", err.response?.data || err.message);
        alert("Failed to load pool data.");
      }
    };

    fetchPool();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/api/editpool/edit/${id}`, {
        poolName: form.poolName,
        poolStyle,
        maxPot: form.maxPot,
        commissionerId: userId
      });

      if (res.status === 200) {
        alert("Pool edited successfully!");
        navigate("/mypoolsdashboard");
      }
    } catch (err) {
      console.error("Error editing pool:", err.response?.data || err.message);
      alert("Failed to edit pool.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Pool</h2>
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

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPool;
