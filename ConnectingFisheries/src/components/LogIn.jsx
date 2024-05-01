import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import Avatar from './Avatar';


const Login = () => {
  const { user, setUser, setRole } = useUserContext(); 
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
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2> Returning Users </h2>
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

      {user && <Avatar username={user} />} {/* Conditionally render Avatar */}
    </div>
  );
};

export default Login;