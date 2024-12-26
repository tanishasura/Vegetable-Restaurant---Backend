import userModel from "../model/usermodel.js";

export const signup = async (req, res) => {
  // console.log(req.body);
  try {
    const { email } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email id is already registered",
        alert: false,
      });
    }
    const newUser = await new userModel(req.body).save();
    res.status(201).json({
      message: "Successfully signed up!",
      success: true,
      newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }); 
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
    
    const validPassword = userModel.findOne({ password }); 
    if (!validPassword) return res.status(400).json({ message: "Invalid email or password" });
    
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image
      }
    });
   
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({  success: false, message: "Internal Server error!" });
  }
};