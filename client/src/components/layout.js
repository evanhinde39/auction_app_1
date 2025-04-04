import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <header style={{ padding: "1rem", backgroundColor: "#eee" }}>
        <h2>Site Header</h2>
      </header>
      
      <nav style={{ padding: "1rem", backgroundColor: "#ccc" }}>
        <a href="/">Home</a> | <a href="/about">About</a>
      </nav>

      <main style={{ padding: "1rem" }}>
        {children}  {/* 👈 This is where the page content goes */}
      </main>

      <footer style={{ padding: "1rem", backgroundColor: "#eee" }}>
        <p>Site Footer</p>
      </footer>
    </div>
  );
};

export default Layout;
