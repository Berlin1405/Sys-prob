import React, { useState } from 'react';
import styles from './App.module.css';
import {  useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';


function App() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const notify = ()=> toast.success('Successfully Logined!')

  const handleLogin = () => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({
        user_name: name,
        password: pass
      })
    })
    .then(res => res.text())
    .then(result => {
      if (result === "Success") {
        {notify}
        navigate("/AddPc");
      } else {
        toast.error(result);
      }
    })
    .catch(error => {
    
      toast.error("An error occurred during login. Please try again.");
    });
  };

  return (
    <div className={styles.app}>
       <Toaster position="top-center" reverseOrder={false}/>
      <div className={styles.blurredBackground}></div>
      <div className={styles.container}>
        <div className={styles.left_back}>
          <div className={styles.left_cont}>
            <h2>Welcome To CVRDE!</h2>
            <p>Enter Your Details to get access!</p>
          </div>
        </div>
        <hr />
        <div className={styles.right_cont}>
          <h2>Sign in</h2>
          <input 
            type="text" 
            placeholder='Username' 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder='Password' 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
          />
          <button 
            className={styles.signin_btn} 
            onClick={handleLogin}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
