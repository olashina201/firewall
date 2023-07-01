import { Response, Request } from "express";
import { Forbidden, InternalServerError } from 'http-errors';
import bcryptjs from "bcryptjs";
import User from "../models/User";

export const Register = async (req: Request, res: Response) => {
  try {
    const { fullName, userName, email, password, option } = req.body;
    const user = await User.findOne({ email: email });
    let atpos = email.indexOf("@");
    let domain = email.split("@")[1];
    if (user) {
      return res
        .status(400)
        .send({ error: "user with this email already exist" });
    } else if (atpos < 1 || domain !== "gmail.com") {
      return res
        .status(400)
        .send({ error: "only email with domain @gmail.com is supported." });
    }
    const passwordHash = await bcryptjs.hash(password, 10);
    const newUser = new User({
      fullName,
      userName,
      email,
      password: passwordHash,
      option,
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
    const { userName, password } = req.body;
    const [user] = await User.find({ userName: userName });
    const compared = await bcryptjs.compare(password, user.password);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User with this email not found" });
    } else if (!compared) {
      return res
        .status(400)
        .json({ success: false, message: "email or password not correct" });
    } else {
      return res.status(200).json({ success: true, data: user });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("error");
  }
};

  export const getUser = async (req: Request, res: Response) => {
      try {
        let gettingUser = await User.find({})

        if (!gettingUser) {
          return res .status(400).json({success: false, message:"Cannot get user"})  
      }
      else {
        return res.status(200).json({success: true, data: gettingUser})
      }
    }
    catch (err){
      console.log(err)
      return res.status(500).send('error')
    }
  }

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

export const UpdateAmt = async (req: Request, res: Response) => {
  const { email, amount } = req.body;

  const [user] = await User.find({ email: email });

  if (!user){
    return res.status(400).json({success: false, message: "user doesnt exist"})
  }


  const payload = {
    fullName: user.fullName,
    userName: user.userName,
    email,
    password: user.password,
    option: user.option,
    amount: user.amount + amount
  };
  const updateUser = await User.findOneAndUpdate(email, payload, {
    new: true, 
    runValidators: true
  })

  return res.status(200).json({success: true, message: "success", data: updateUser })
};

export const withdrawAmt = async (req: Request, res: Response) => {
  const { email, amount } = req.body;

  const [user] = await User.find({ email: email });

  if (!user){
    return res.status(400).json({success: false, message: "user doesnt exist"})
  }


  const payload = {
    fullName: user.fullName,
    userName: user.userName,
    email,
    password: user.password,
    option: user.option,
    amount: user.amount - amount
  };
  const updateUser = await User.findOneAndUpdate(email, payload, {
    new: true, 
    runValidators: true
  })

  return res.status(200).json({success: true, message: "success", data: updateUser })
};

