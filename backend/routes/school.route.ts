import express from "express";
import { AddSchool, getAll, getSchool } from "../controllers/school.controller";

const router = express.Router();

router.post('/AddSchool',AddSchool)
router.get('/listSchools',getSchool)
router.get('/getAll',getAll)
export default router;