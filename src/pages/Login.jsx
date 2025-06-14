import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Simulate login API call
      const response = await fakeLoginApi(email, password); // Replace with your actual API call
      if (response.success) {
        // Save token/session if needed
        localStorage.setItem('token', response.token);

        // Redirect to /dashboard
        navigate('/dashboard');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

// Mock API function for demonstration
const fakeLoginApi = async (email, password) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password') {
        resolve({ success: true, token: 'fake-jwt-token' });
      } else {
        resolve({ success: false });
      }
    }, 1000)
  );
};

export default Login;
