import express from "express";
import JobController from "../Controllers/jobController.js";

const router = express.Router();

router.get("/jobs", JobController.getJobPagination);
router.get("/", JobController.getJobs);
router.get("/:id", JobController.getJobById);
router.post("/", JobController.createJob);
router.put("/:id", JobController.updateJob);
router.delete("/:id", JobController.deleteJob);

export default router;
