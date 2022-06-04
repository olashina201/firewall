import { Response, Request } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/User";

export const Register = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, middlename, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if(user) return res.send({ error: "user with that email already exist" })
    const passwordHash = await bcryptjs.hash(password, 10);
    const newUser = new User({
      firstname,
      lastname,
      middlename,
      email,
      password: passwordHash,
    });
    const saved = await newUser.save();
    return res.status(200).json({ success: true, data: saved });
  } catch (err) {
    console.log(err);
    return res.status(500).send("error");
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const [user] = await User.find({ email: email });
    const compared = await bcryptjs.compare(password, user.password);
    if (!user || !compared) {
      return res.status(400).json({ success: false, message: "email or password not correct" });
    } else {
      return res.status(200).json({ success: true, data: user });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("error");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const {
    query: { id },
  } = req;

  const user = await User.deleteOne({ _id: id });
  if (!user) {
    return res.status(400).json({ success: false });
  } else {
    return res.status(200).json({ success: true, data: {} });
  }
};
