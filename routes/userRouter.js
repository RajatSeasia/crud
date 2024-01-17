import { Router } from "express";
import { login, register,getAllUser ,deleteUser,updateUser} from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/all", getAllUser);
userRouter.post("/delete", deleteUser);
userRouter.post("/update", updateUser);




export default userRouter;
