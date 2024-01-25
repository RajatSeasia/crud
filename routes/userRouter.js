import { Router } from "express";
import { login, register,getAllUser ,deleteUser,updateUser, getUserProfile, logOut} from "../controllers/userController.js";
import verifyToken from "../models/authMiddleware.js";
import { download, getListFiles, upload } from "../controllers/file.Controller.js";
import uploadFile from "../models/upload.js";
import { createUserBlogs, getAllBlogs } from "../controllers/blogsController.js";

const userRouter = Router();

userRouter.post("/register",register);
userRouter.post("/login", login);
userRouter.get("/all", verifyToken,getAllUser);
userRouter.post("/delete",verifyToken, deleteUser);
userRouter.post("/update",verifyToken, updateUser);
userRouter.get('/user-profile',verifyToken,getUserProfile)
userRouter.post('/file-upload',verifyToken,uploadFile, upload)
userRouter.get('/get-files',verifyToken, getListFiles)
userRouter.get('/download-all',verifyToken, download)
userRouter.get('/logout',verifyToken, logOut)
userRouter.post('/create-blogs',verifyToken,createUserBlogs)
userRouter.get('/get-all-blogs',verifyToken,getAllBlogs)





export default userRouter;
