import express from "express";
import { AddSchool, getSchool } from "../controllers/school.controller.js";

const router = express.Router();

router.post('/addSchool',AddSchool)
router.get('/listSchools',getSchool)
export default router;