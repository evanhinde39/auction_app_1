import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <header className="bg-dark text-white py-2">
        <h2 className="ms-3">auctionpools.ca</h2>
      </header>
      
      <nav className="bg-danger d-flex">
        <a href="/" className="btn btn-danger mx-2 my-1 text-white hover-expand">Home</a>
        <a href="/mypools" className="btn btn-danger mx-2 my-1 text-white hover-expand">My Pools</a>
        <a href="/joinpool" className="btn btn-danger mx-2 my-1 text-white hover-expand">Join Pool</a>
        <a href="/createpooldashboard" className="btn btn-danger mx-2 my-1 text-white hover-expand">Create Pool</a>
        <a href="/about" className="btn btn-danger mx-2 my-1 text-white hover-expand ms-auto">About</a>
        <a href="/login" className="btn btn-danger mx-2 my-1 text-white hover-expand ms-auto">Login</a>
        <a href="/register" className="btn btn-danger mx-2 my-1 text-white hover-expand ms-auto">Register</a>
      </nav>

      <main style={{ padding: "1rem" }}>
        {children}  {/* 👈 This is where the page content goes */}
      </main>

      <footer className="d-flex justify-content-center align-items-center p-3">
        <a href="/" className="text-black text-decoration-none mx-3 hover:text-danger">Home</a>
        <a href="/about" className="text-black text-decoration-none mx-3 hover:text-danger">About</a>
      <a href="/contact" className="text-black text-decoration-none mx-3 hover:text-danger">Contact</a>
</footer>






    </div>
  );
};

export default Layout;
