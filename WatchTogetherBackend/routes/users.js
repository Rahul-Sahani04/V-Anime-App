import express from "express";

const router = express.Router();

// Import the user controllers
import { loginUser } from "../controllers/login.js";
import { registerUser } from "../controllers/register.js";
import { isTokenValid } from "../controllers/isTokenValid.js";
import { userProfile } from "../controllers/profile.js";
import { changePassword } from "../controllers/change-password.js";
import { deleteUser } from "../controllers/delete.js";
import { authorizedRoutes } from "../auth/auth.js";
import { addVideoToWatchlist } from "../controllers/add-video.js";

// User login end points
router.get("/login");
router.post("/login", loginUser);

// User register end points
router.get("/register");
router.post("/register", registerUser);

// User token validation end point
router.post("/is-token-valid", authorizedRoutes, isTokenValid);

// User profile end point
router.get("/profile", authorizedRoutes, userProfile);

// Get user id by token end point
router.get("/get-user-id", authorizedRoutes, );


// add video id to user profile end point
router.post("/add-video-to-watchlist", authorizedRoutes, addVideoToWatchlist);

// User change password end point
router.post("/change-password", authorizedRoutes, changePassword);

// User delete account end point
router.delete("/delete-account/:id", authorizedRoutes, deleteUser);

export default router;
