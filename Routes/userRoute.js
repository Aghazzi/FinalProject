import UserController from "../Controllers/userController.js";
import express from "express";
import verifyToken from "../middleware/authentication.js";

const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/apply/:jobId", UserController.applyForJob);

router.get("/organizations", UserController.getOrganizationsPagination);
router.get("/users", UserController.getUsersPagination);

router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

router.get("/", UserController.getUsers);

export default router;
