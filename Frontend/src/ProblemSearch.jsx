import React, { useState } from "react";
import Container from "./Container";
import Styles from "./ProblemSearch.module.css";
import toast, { Toaster } from "react-hot-toast";

function ProblemSearch() {
  const [problem_type, set_problem_type] = useState("");
  const [state, set_state] = useState([]);
  const [search, set_search] = useState(false); // Initialize search state
  

  return (
    <Container>
      <h1>Problem Search!</h1>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={Styles.prob}>
        <p>Search the problem here!</p>
        <input
          type="search"
          placeholder="Type to view the problems"
          onChange={(e) => {
            set_problem_type(e.target.value);
          }}
        />
      </div>
      <div className="btn_dir">
        <button
          className={Styles.prob_btn}
          onClick={() => {
            history.back();
          }}
        >
          Back
        </button>
        <button
          className={Styles.prob_btn} 
          onClick={() => {
            fetch("http://localhost:3000/fetch_problems", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                problem_type: problem_type,
              }),
            })
              .then((result) => result.json())
              .then((data) => {
                set_state(data);
                set_search(true); // Set search to true when data is fetched
                console.log(data);
              })
              .catch((error) => {
                toast.error("Cannot fetch the detail!");
              });
          }}
        >
          Search
        </button>
        {search && state.length === 0 ? (
          <h6>No Data Found!</h6>
        ) : search && state.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Solution</th>
              </tr>
            </thead>
            <tbody>
              {state.map((item, index) => (
                <tr key={index} >
                  <td>{item.pc_serial_number}</td>
                  <td>{item.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </Container>
  );
}

export default ProblemSearch;
