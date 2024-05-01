import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { role, setRole } = useUserContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false); 
  const navigate = useNavigate ()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = isSignup ? '/api/users/create' : '/api/users/login';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (response.ok) {
        alert('User authenticated successfully!');
        // Redirect user based on role
        if (role === 'sole_trader') {
          navigate('/yourfish') 
        } else if (role === 'government_official') {
          navigate('/map') 
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to authenticate user');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
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
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="sole_trader">Sole Trader</option>
          <option value="government_official">Government Official</option>
        </select>

        <div>
          <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
          <button type="button" onClick={() => setIsSignup(!isSignup)}>{isSignup ? 'Login' : 'Signup'}</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
