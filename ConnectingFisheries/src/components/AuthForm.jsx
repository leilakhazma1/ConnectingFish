import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';

const AuthForm = () => {
  const { setRole } = useUserContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUser, setRememberUser] = useState(false);

  const handleLogin = async (e) => {
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
        const data = await response.json();
        setRole(data.role);
        if (rememberUser) {
          localStorage.setItem('user', JSON.stringify({ username, role: data.role }));
        }
        if (data.role === 'sole_trader') {
          window.location.href = '/yourfish';
        } else if (data.role === 'government_official') {
          window.location.href = '/map';
        }
      } else {
        throw new Error('Failed to login');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setRole(data.role);
        if (rememberUser) {
          localStorage.setItem('user', JSON.stringify({ username, role: data.role }));
        }
        if (data.role === 'sole_trader') {
          window.location.href = '/yourfish';
        } else if (data.role === 'government_official') {
          window.location.href = '/map';
        }
      } else {
        throw new Error('Failed to sign up');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {/* Username and password inputs */}
        <button type="submit">Login</button>
      </form>

      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        {/* Email, password, remember me checkbox */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default AuthForm;
