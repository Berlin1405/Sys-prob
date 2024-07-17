
import React, { useEffect, useState } from 'react';
import Styles from './Problem.module.css';
import Container from './Container';
import toast,{Toaster} from 'react-hot-toast';

function Problem() {
    const [pc_serial_number,setpc_serial_number]=useState('');
    const [pc_problem,setpc_problem]=useState('');
    const [solution,setsolution]=useState('');
    const [serial, setSerial] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/fetch_pc")
            .then((response) => response.json()) 
            .then((data) => setSerial(data))
            .catch((error) => toast.error("Error fetching data:", error));
    }, []);

    return (
        <Container>
            <h1>Problems AND Report!</h1>
            <div className={Styles.prob}>
                <label htmlFor="pc">PC Serial Number :</label>
             
                <select className={Styles.sel} value={pc_serial_number} onChange={(e)=>{
                    setpc_serial_number(e.target.value)
                    
                }}>
                    {
                        serial.map((s) => {
                            return <option value={s}>{s}</option>
                        })
                    }
                </select>
            </div>
            <div className={Styles.prob}>
            <Toaster position="top-center" reverseOrder={false}/>
                <label htmlFor="prob">Problem Type :</label>
                <select className={Styles.sel} value={pc_problem} onChange={(e)=>{
                    setpc_problem(e.target.value);
                }}>
                    <option value="Hardware">HardWare Failure</option>
                    <option value="os failure">OS Failure</option>
                    <option value="over heating">Over Heating</option>
                    <option value ="driver failure">Driver Failure</option>
                </select>
            </div>
            <div className={Styles.prob}>
                <p>Solution: </p>
                <input type='text' placeholder='Type the solution' value={solution} onChange={(e)=>{
                    setsolution(e.target.value)
                }}/>
            </div>
            <div className="btn_dir">
                <button className={Styles.btn} onClick={() => {
                    history.back();
                }}>Back</button>
                <button type='insert' className={Styles.btn} onClick={()=>{
                    console.log(pc_problem);
                    fetch("http://localhost:3000/add_solution", {
                        method: "POST",
                        headers: { 'Content-Type': "application/json" },
                        body: JSON.stringify({
                          pc_serial_number:pc_serial_number,
                          problem_type:pc_problem,
                          solution:solution,
                        })
                      })
                      .then(res => res.text())
                      .then(result => {
                        if (result === "success") {
                         toast.success("Added Successfully")
                        } else {
                          toast.error(result);
                        }
                      })
                      .catch(error => {
                       
                        toast.error("An error occurred during login. Please try again.");
                })}
                }>Submit</button>
            </div>
        </Container>
    );
}

export default Problem;
