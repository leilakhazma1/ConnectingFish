import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import Login from '../components/LogIn';
import SignUp from '../components/SignUp';

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn, role } = useUserContext();

  useEffect(() => {
    if (isLoggedIn) {
      if (role === 'government_official') {
        navigate('/map');
      } else if (role === 'sole_trader') {
        navigate('/yourfish');
      }
    }
  }, [isLoggedIn, role, navigate]);

  return (
    <div className="Home">
      <h1> Connecting Fish </h1>
      {isLoggedIn ? (
        <p>Welcome back, {role === 'government_official' ? 'Government Official' : 'Sole Trader'}!</p>
      ) : (
        <>
          <Login />
          <SignUp />
        </>
      )}
    </div>
  );
}

export default Home;
