import React from "react";
import { useLocation } from "react-router-dom";

const CreatePool = () => {
  const location = useLocation();
  const poolStyle = location.state?.poolStyle || "Unknown Style";

  return (
    <div className="container mt-5">
      <h2>Create Pool</h2>
      <p>When creating a pool, you become commissioner of your pool</p>
      <form>
        <div className="mb-3">
          <label htmlFor="poolName" className="form-label">Pool Name</label>
          <input
            type="text"
            className="form-control"
            id="poolName"
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
