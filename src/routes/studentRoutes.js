import express from "express";

import studentController from "../controllers/studentController.js";

const router = express.Router();

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getByStudentId);
router.get("/byUser/:id", studentController.getStudentByUserId);
router.get("/byRollno/:id", studentController.getStudentByRollno);

router.post("/", studentController.createStudent);

router.put("/:id", studentController.updateByStudentId);

router.delete("/:id", studentController.deleteByStudentId);

export default router;