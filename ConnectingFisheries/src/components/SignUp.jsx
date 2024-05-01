import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const SignUp = () => {
  const { setUser, setRole } = useUserContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setSelectedRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const response = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (response.ok) {
        setUser(username);
        setRole(role);
        alert('User created successfully!');
        if (role === 'sole_trader') {
          navigate('/yourfish');
        } else if (role === 'government_official') {
          navigate('/map');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ width: '30%' }}>
        <h2 style={{ textAlign: 'center' }}>New Users</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setSelectedRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="sole_trader">Sole Trader</option>
            <option value="government_official">Government Official</option>
          </select>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
