import React, { useState } from 'react';
import { auth } from '../config/firebaseConfig';  // Import auth from your firebaseConfig
import { signInWithEmailAndPassword } from 'firebase/auth';  // Import signInWithEmailAndPassword from firebase/auth

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleLogin(email, password);
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;
  
