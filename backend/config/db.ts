import mysql from "mysql2";

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.user,
    password: process.env.password,
    database: process.env.DATABASE
})

console.log(process.env.HOST,process.env.user,process.env.password,process.env.DATABASE)

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL database');
    }
});

export {db}