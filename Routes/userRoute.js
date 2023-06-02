import UserController from "../Controllers/userController.js";
import express from "express";
import verifyToken, { accessRoles } from "../middleware/authentication.js";

const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post(
    "/apply/:jobId",
    verifyToken,
    accessRoles(["User"]),
    UserController.applyForJob
);
router.post("/logout", UserController.logout);

router.get(
    "/organizations",
    verifyToken,
    UserController.getOrganizationsPagination
);
router.get("/users", verifyToken, UserController.getUsersPagination);

router.get("/user/:id", verifyToken, UserController.getUserById);
router.get("/org/:id", verifyToken, UserController.getOrgById);
router.patch(
    "/:id",
    verifyToken,
    accessRoles(["User", "Org"]),
    UserController.updateUser
);
router.delete(
    "/:id",
    verifyToken,
    accessRoles(["User", "Org"]),
    UserController.deleteUser
);

router.get("/", UserController.getUsers);

export default router;
