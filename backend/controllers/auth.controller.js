import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be atleast 6 characters long" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "user already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      });

    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const {email , password}= req.body;
  try {
    
    if(!email || !password){
        return res.status(400).json({message:"complete all fields"})
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
    const hashedPassword= user.password;

    const isMatch = await bcrypt.compare(password , hashedPassword);

    if(!isMatch){
        return res.status(400).json({message:"Wrong password"})
    }

    generateToken(user._id , res)

    res.status(200).json(user)
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt","",{maxAge: 0});
    res.status(200).json({message:"logout successfull"})
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
