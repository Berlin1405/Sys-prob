import React from 'react';
import styles from './Pc.module.css';
import {  useNavigate } from 'react-router-dom';
import Container from './Container';
import Problem from './Problem';
import toast,{Toaster} from 'react-hot-toast';
import { useEffect } from 'react';

function Pc() {
    const navigate = useNavigate();
    const add = ()=>{
        navigate("/PcInfo")
    }
    const Problem = ()=>{
        navigate("/Problem")
    }
    const Report =()=>{
        navigate("/ProblemSearch")
    }
    useEffect(()=>{
        toast.success("Successfully Logged In!");
  
      },[]);
    return (
        <Container>
            <Toaster position="top-center" reverseOrder={false}/>
			<h1>Add The PC Information!</h1>
           
            <div className={styles.container}>
                <div className={styles.btn_01}>
                    <button onClick={add}>Add Pc</button>
                    <button onClick={Problem}>Problem</button>
                </div>
                <div className={styles.btn}>
                    <button onClick={Report}>Report</button>
                </div>
            </div>
        </Container>
    );
}

export default Pc;
