import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';

const LoginForm = () => {
  const { setUser } = useUserContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/${isLogin ? 'login' : 'signup'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        alert(`${isLogin ? 'Login' : 'Signup'} successful!`);

        // Reset form fields
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || `${isLogin ? 'Login' : 'Signup'} failed`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        {!isLogin && (
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}

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

        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Signup' : 'Switch to Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
