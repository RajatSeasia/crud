import { Router } from "express";
import { login, register,getAllUser ,deleteUser,updateUser} from "../controllers/userController.js";
import verifyToken from "../models/authMiddleware.js";

const userRouter = Router();

userRouter.post("/register",register);
userRouter.post("/login", login);
userRouter.get("/all", verifyToken,getAllUser);
userRouter.post("/delete",verifyToken, deleteUser);
userRouter.post("/update",verifyToken, updateUser);




export default userRouter;
