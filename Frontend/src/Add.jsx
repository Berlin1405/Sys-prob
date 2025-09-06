import React, { useState } from 'react'
import Container from './Container'
import styles from './Add.module.css'
import toast, { Toaster } from 'react-hot-toast';

function Add() {
  const [user_name, setuser_name] = useState("");
  const [pc_make, setpc_make] = useState("");
  const [pc_serial_number, setpc_serial_number] = useState("");
  return (
    <Container>
      <h1>Edit The PC Informations!</h1>
      <div>
        <div className={styles.pc_cont}>
          <Toaster position="top-center" reverseOrder={false} />
          <label htmlFor="user">UserName:</label> 
          <input type="text" placeholder='Username' value={user_name} onChange={(e) => {
            setuser_name(e.target.value)
          }} />
        </div>
        <div className={styles.pc_cont}>
          <label htmlFor="pc make">PC Make:</label>
          <input type="text" placeholder='Pc Make' value={pc_make} onChange={(e) => {
            setpc_make(e.target.value)
          }} />
        </div>
        <div className={styles.pc_cont}>
          <label htmlFor="pc serial">PC Serial Number :</label>
          <input type="text" placeholder='Pc Serial No' value={pc_serial_number} onChange={(e) => {
            setpc_serial_number(e.target.value)
          }} />
        </div>
      </div>
      <div className="styles.insert_btn">
        <button className={styles.insert_btn} onClick={() => {
          history.back()
        }} >Back</button>
        <button className={styles.insert_btn} onClick={() => {
          fetch("http://localhost:3000/insert", {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({
              user_name: user_name,
              pc_make: pc_make,
              pc_serial_number: pc_serial_number
            })
          })
            .then(res => res.text())
            .then(result => {
              toast.success(result)
            })
            .catch(error => {
              toast.error("An error occurred during login. Please try again.");
            });
        }} >Insert</button>
      </div>

    </Container>
  )
}
export default Add