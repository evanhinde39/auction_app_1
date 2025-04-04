import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [dbResponse, setDbResponse] = useState(null);

  useEffect(() => {
    fetch("/test-db")
      .then((res) => res.json())
      .then((data) => setDbResponse(data))
      .catch((err) => console.error("Error fetching DB test:", err));
  }, []);

  return (
    <div>
      <h1>React App</h1>
      <h2>Database Test:</h2>
      {dbResponse ? (
        <p>Success! Server Time: {dbResponse.time}</p>
      ) : (
        <p>Loading database test...</p>
      )}
      <button className="btn btn-danger">
        test bootstrap button
      </button>
    </div>
  );
};

export default Home;
