import express from "express";
import JobController from "../Controllers/jobController.js";
import verifyToken, { accessRoles } from "../middleware/authentication.js";

const router = express.Router();

router.get("/jobs", verifyToken, JobController.getJobPagination);
router.get("/", JobController.getJobs);
router.get("/:id", verifyToken, JobController.getJobById);
router.post("/", verifyToken, accessRoles(["Org"]), JobController.createJob);
router.patch(
    "/:id",
    verifyToken,
    accessRoles(["Org"]),
    JobController.updateJob
);
router.delete(
    "/org/:id",
    verifyToken,
    accessRoles(["Org"]),
    JobController.deleteJob
);

export default router;
