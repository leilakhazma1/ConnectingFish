import React from 'react';

const Avatar = ({ username }) => {
  const initials = username
    .split(' ')
    .map((name) => name.charAt(0))
    .join('');

  return (
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#ccc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
    }}>
      {initials}
    </div>
  );
};

export default Avatar;
