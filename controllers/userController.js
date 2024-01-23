import UserRegister from "../models/newUserRegister.js";
import UserLogin from "../models/loginUser.js";
import bcrypt from 'bcrypt'
import jsonwebtoken from "../jwt/jwt.js";
import { jwtDecode } from 'jwt-decode';

export const register = async (req, res) => {
  const { name, email, password, phone, createdAt } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new UserRegister({
      name,
      email,
      password:hashedPassword,
      confirmPassword:hashedPassword,
      phone,
      createdAt,
    });

    await user.save()
    res.status(200).json("user Created successfully"); // returning data with status code 200
  } catch (error) {
    // this is for throwing error
    res.status(400).json({ error: error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserRegister.findOne({ email });
    if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
    return res.status(401).json({ error: 'wrong password' });
    }
    const token = jsonwebtoken(user)

    res.status(200).json({code:200, token: token,message:"User Logged in successfully" });
    } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    }
};

export const getAllUser = async (req, res) => {
  try {
    const allUser = await UserRegister.findOne().select("-password").select("-confirmPassword");
    res.status(200).json(allUser);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


export const deleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    const allUser = await UserRegister.deleteOne({ email: email });

    res.status(200).json("User deleted successfully");
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
export const updateUser = async (req, res) => {
  const { email,name, phone } = req.body;
  try {
    const allUser = await UserRegister.updateOne(
      { email: email },
      { name: name, phone: phone }
    );
    res.status(200).json("UpdateSuccess");
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const getUserProfile=async(req,res)=>{
  const { email,name, phone } = req.body;
  try{
    const token = req.header('Authorization');
    const decoded = jwtDecode(token);
    const user = await UserRegister.findOne({ id:decoded.id }).select("-password").select("-confirmPassword");;
  
     res.status(200).json(user)
  }catch(err){
    res.status(400).json({ error: err });
  }
}


