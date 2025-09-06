import { createConnection } from "mysql2";

var connection = createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Thanush@14",
    database: "pc_man"
});

export function validate_user(username, password) {
    return new Promise((resolve, reject) => {
        var check_user_query = "SELECT * FROM user_details WHERE username = ?";
        connection.query(check_user_query, [username], (err, result) => {
            console.log(result,err);
            
            if (err) {
                reject("err");
                
            }
            if (result.length == 0) {
                resolve("No user");
            }
            var user = result[0];
            console.log(user);
            if (user.password === password) {
                resolve("Success");
            } else {
                resolve("Wrong password");
            }
        });
    });
}
export function insert(username, pc_make, pc_serial_number) {
    return new Promise((resolve, reject) => {
        var insert_user_info = "INSERT INTO pc_information (username,pc_make,pc_serial_number) VALUES (?,?,?)";
        connection.query(insert_user_info, [username, pc_make, pc_serial_number], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    reject("Entry already exist!")
                } else {
                    reject("Failed to Insert!", err.message);
                }
            } else {
                resolve("Successfully Inserted!")
            }
        })
    })

}
export function pcinfo() {
    return new Promise((resolve, reject) => {
        var fetch = " select pc_serial_number from pc_information"
        connection.query(fetch, (err, result) => {
            if (err) {
                reject("Cannot");
                return;
            } else {
                var fetchh = result.map((obj) => {
                    return obj.pc_serial_number
                });
                resolve(fetchh)
            }
        })

    })
}
export function add_solution(pc_serial_number, problem_type, solution) {
    return new Promise((resolve, reject) => {
        var put_info = "INSERT INTO pc_solution(pc_serial_number,problem_type,solution) VALUES(?,?,?)";
        connection.query(put_info, [pc_serial_number, problem_type, solution], (err, result) => {
            if (err) {
                if(err.code == "ER_DUP_ENTRY") {
                    reject("Entry Already exist");
                } else {
                    console.log(err);
                    reject("Failed to Insert", err.code);
                }
            } else {
                resolve("Successfully")
            }
        })

    })
}

export function problem_search(problem_type){
    return new Promise((resolve,reject)=>{
        var pattern = "%" + problem_type + "%";
        var search_query = "SELECT pc_serial_number, solution from pc_solution where problem_type like ?";
        connection.query(search_query, [pattern], (err, result) => {
            if (err) {
                console.log(err);
                reject("Can't get the details");
            } else {
                var mapped_result = result.map((obj) => {
                    return {
                        pc_serial_number: obj.pc_serial_number,
                        solution: obj.solution,
                    }
                });
                console.log(mapped_result);
                resolve(mapped_result);
            }
        })
    })
}