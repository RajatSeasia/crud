import { Router } from "express";
import { login, register,getAllUser ,deleteUser,updateUser, getUserProfile} from "../controllers/userController.js";
import verifyToken from "../models/authMiddleware.js";

const userRouter = Router();

userRouter.post("/register",register);
userRouter.post("/login", login);
userRouter.get("/all", verifyToken,getAllUser);
userRouter.post("/delete",verifyToken, deleteUser);
userRouter.post("/update",verifyToken, updateUser);
userRouter.get('/user-profile',verifyToken,getUserProfile)




export default userRouter;
