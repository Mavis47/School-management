import mysql from "mysql2";

const db = mysql.createConnection({
    host: process.env.host,
    user: 'root',
    password: 'manish7089',
    database: 'school'
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL database');
    }
});

export {db}