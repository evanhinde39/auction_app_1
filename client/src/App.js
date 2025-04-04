import React, { useEffect, useState } from "react";

function App() {
  const [dbResponse, setDbResponse] = useState(null);

  useEffect(() => {
    fetch("/test-db")  // 👈 Remove "http://localhost:3001", just use "/test-db"
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
    </div>
  );
}

export default App;
