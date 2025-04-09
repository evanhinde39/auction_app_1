import React from "react";
import { Link } from "react-router-dom"; // make sure this is installed and set up

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Create Pool</h2>

      <Link 
        to="/createpool" 
        state={{ poolStyle: "NFL Regular Season" }}
        style={{ textDecoration: 'none' }}
      >
        <div
          className="rounded-3 shadow-sm overflow-hidden"
          style={{
            width: '20vw',
            minWidth: '200px',
            height: '160px',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {/* Top (taller) */}
          <div
            className="bg-white d-flex justify-content-center align-items-center"
            style={{ flex: 2 }}
          >
            <div
              className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: '60px', height: '60px' }}
            >
              <i className="bi bi-plus-lg fs-3"></i>
            </div>
          </div>

          {/* Bottom (smaller) */}
          <div
            className="bg-primary text-white d-flex justify-content-center align-items-center fw-bold"
            style={{ flex: 1, fontSize: '1.2rem' }}
          >
            NFL Regular Season
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
