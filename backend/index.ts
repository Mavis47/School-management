import express from "express";
import type { Request,Response } from "express";
// import "./config/db.js";
import schoolRoute from "./routes/school.route.js";

const app = express();
const PORT = process.env.PORT || 5001

import mysql from "mysql2";
import "dotenv/config";

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


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/',schoolRoute)

app.get('/',(req: Request,res: Response) => {
    res.send("Hey I me Bun");
})

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`)
})

export default app;
