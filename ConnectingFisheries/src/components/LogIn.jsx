import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Login = () => {
  const { setUser, setRole } = useUserContext(); 
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { role } = await response.json(); 
        setUser(username);
        console.log(role)
        setRole(role);
        alert('User logged in successfully!');
        if (role === 'sole_trader') {
          navigate('/yourfish');
        } else if (role === 'government_official') {
          navigate('/map');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to log in');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <div style={{ width: '30%' }}>
        <h2 style={{ textAlign: 'center' }}>Returning Users</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
