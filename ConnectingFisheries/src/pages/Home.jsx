import React from 'react';
import '../App.css'
import Login from '../components/LogIn';
import SignUp from '../components/SignUp';




function Home() {
  return (
    <div className="Home">
        <h1> Connecting Fish </h1>
         
       <Login />
       <SignUp />

         
      </div>
 
      
     
   
  );
}

export default Home;