
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookies from "../utils/generateTokens.js";

const register = async(req, res) => {
    try {
        const {fullname, username, password} = req.body;
    
        if (!fullname || !username || !password) {
            return res.status(400).json("Please enter all required fields");
        }

        const existingUser = await User.findOne({
            username
        })

        if (existingUser) {
            return res.status(400).json("Username already taken")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
    
        const user = new User({fullname, username, password: hashedPassword})

        generateTokenAndSetCookies(user._id, res);
    
        await user.save();
    
        return res
        .status(200)
        .json(user)
    } catch (error) {
        console.log("Error in register controller", error);
        return res.status(500).json(error)
    }
}

const login = async(req, res) => {
    try {
        const {username, password} = req.body

        if (!username || !password) {
            return res.status(400).json("Please enter all required fields");
        }

        const user = await User.findOne({
            username
        })

        if (!user) {
            return res.status(400).json("User does not exist")
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("Please enter correct password")
        }

        generateTokenAndSetCookies(user._id, res);

        return res
        .status(200)
        .json(user)

    } catch (error) {
        console.log("Error in login controller", error);
        return res.status(500).json(error)
    }
}

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        return res.status(200).json({
            message:"Logout successfully",
        })
    } catch (error) {
        console.log("Error in logout controller", error);
        throw error;
    }
}


export {
    register,
    login,
    logout
};