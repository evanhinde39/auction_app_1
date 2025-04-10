import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Make sure the URL points to the correct port for your backend server
      await axios.post('http://localhost:3001/api/auth/register', form);
      alert('Registered successfully!');
    } catch (err) {
      alert('Registration failed');
      console.error(err);  // You can also log the error for debugging
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
