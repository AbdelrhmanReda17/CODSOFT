const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');


const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.SECRET, { expiresIn: "1h" });    
    res.status(200).json({ result: {username : oldUser.username , _id : oldUser._id}, token });    
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  console.log(email , password , name)
  try {
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({ email, password: hashedPassword, username: name });
    const token = jwt.sign( { email: newUser.email, id: newUser._id }, process.env.SECRET, { expiresIn: "1h" } );   
    res.status(201).json({ result: {username : newUser.username , _id : newUser._id} , token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    }
};


module.exports = {
    signIn,
    signUp,
};
  