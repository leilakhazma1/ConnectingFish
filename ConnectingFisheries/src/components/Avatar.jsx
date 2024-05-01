import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const Avatar = ({ username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setUser, setRole, setIsLoggedIn, setUsername } = useUserContext();
  const navigate = useNavigate();

  const initials = username
    .split(' ')
    .map((name) => name.charAt(0))
    .join('');

  const handleLogout = () => {
    setUser(null); // Clear the user data from context
    setRole(''); // Clear the user's role from context
    setIsLoggedIn(false); // Update the login status to false
    setUsername(''); // Clear the username from context
    navigate('/'); // Redirect to the home page
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        marginRight: '20px', // Adjust as needed
      }}
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#ccc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        {initials}
      </div>
      {isDropdownOpen && (
        <div
          style={{
            position: 'absolute',
            top: '10px', 
            right: '0',
            border: 'none',
            padding: '10px',
          }}
        >
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
