import express, { request, response } from 'express'
import cors from "cors"
import {validate_user,insert,pcinfo, add_solution, problem_search} from "./main.js"

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.post('/login', (request, response) => {
    console.log("POST /login")
    const { user_name, password } = request.body;
    validate_user(user_name, password).then((result) => {
        if(result)
        console.log("\t>> Outcome: Success.");
        response.send(result);
    })
    .catch((err) => {
        console.log("\t>> Outcome: Error(",err,").");
        response.send(err);
    })
})

app.post('/insert',(request,respone)=>{
    console.log("POST /insert");
    const {user_name,pc_make,pc_serial_number} = request.body;

    insert(user_name,pc_make,pc_serial_number).then((result)=>{
        console.log("\t>> Outcome: Success.");
        respone.send(result)
    })
    .catch((err)=>{
        console.log("\t>> Outcome: Error(", err, ")");
        respone.send(err);
    });
})

app.get('/fetch_pc',(_,response)=>{
    console.log("GET /fetch_pc");
    pcinfo().then((result)=>{
        console.log("\t>> Outcome: Success.");
        response.send(result);
    })
    .catch((err)=>{
        console.log("\t>> Outcome: Error(", err, ")");
        response.send(err);
    })
})

app.post('/add_solution',(request,response)=>{
    console.log("POST /add_solution");
    const {pc_serial_number,problem_type,solution}=request.body;

    add_solution(pc_serial_number,problem_type,solution).then((result)=>{
        console.log("\t>> Outcome: Success.");
        response.send("success");
    })
    .catch((err)=>{
        console.log("\t>> Outcome: Error(",err,")");
        response.send(err);
    });
})
app.post('/fetch_problems',(request,response)=>{
    console.log("/POST fetch_problem");
    const{problem_type}=request.body;

    problem_search(problem_type).then((result)=>{
        console.log("\t>> Outcome: Success");
        response.send(result);
    })
    .catch((err)=>{
        console.log("\t>> Outcome: Error(", err, ")");
        response.send(err);
    })
})

app.listen(PORT, () => {
    console.log("Application listening on PORT:", PORT);
});