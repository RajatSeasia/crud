import UserRegister from "../models/newUserRegister.js";
import UserLogin from "../models/loginUser.js";
export const register = async (req, res) => {
  const { name, email, password, confirmPassword, phone, createdAt } = req.body;
  try {
    const user = new UserRegister({
      name,
      email,
      password,
      confirmPassword,
      phone,
      createdAt,
    });

    await user.save();

    res.status(200).json("user Created successfully"); // returning data with status code 200
  } catch (error) {
    // this is for throwing error
    res.status(400).json({ error: error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginUsers = await UserRegister.findOne({ email: email });
    if (loginUsers.email === email) {
      res.status(200).json("user logged in  successfully"); // returning data with status code 200
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const allUser = await UserRegister.find();
    res.status(200).json(allUser);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
export const deleteUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const allUser = await UserRegister.deleteOne({ email: email });

    res.status(200).json("User deleted successfully");
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
export const updateUser = async (req, res) => {
  const { email, password, name, phone } = req.body;
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
