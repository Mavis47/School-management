import express from "express";
import type { Request,Response } from "express";
import "./config/db.js";
import schoolRoute from "./routes/school.route.js";

const app = express();
const PORT = process.env.PORT || 5001

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
