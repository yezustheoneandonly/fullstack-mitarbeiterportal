import User from "../Models/UserModel.js";
import { comparePassword, hashPassword } from "../lib/passwordUtils.js";
import jwt from 'jsonwebtoken'

import sendPassword from '../services/template-email/sendPassword.js'
import generateRandomPassword from "../utils/randomePassword.js";

export const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user || !await comparePassword(password, user.password)) {
            const error = new Error()
            error.detail = 'Invalid  Email or Password'
            error.status = 400;
            return next(error);
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            });

        res.cookie('_authToken', token,
            {
                httpOnly: true,
                secure: false,
                sameSite: "none",
            })


        res.status(200).json({ role: user.role, checkedIn: user.checkedIn, firstName: user.firstName, lastName: user.lastName });

    } catch (error) {
        next(error)
    }
}

export const logout = async (req, res) => {
    res
        .clearCookie("_authToken", {
            httpOnly: true,
            secure: false,
            sameSite: "none",
        })
        .send("User logged out");
};

export const returnUserData = async (req, res) => {
    const existingUser = await User.findOne({ _id: req.user.userId })
    res.status(200).json(existingUser)
}

// ####################################

export const createUser = async (req, res, next) => {
    console.log(req.body);
    if (req.user.role !== 'admin') {
        const error = new Error()
        error.detail = 'Only Admin can create new Users'
        error.status = 401;
        return next(error)
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        const error = new Error();
        error.detail = 'Email is already registered';
        error.status = 409;
        return next(error)
    }

    const password = generateRandomPassword(12)
    req.body.password = await hashPassword(password)
    const user = new User(req.body);
    try {
        await user.save()
        sendPassword(req.body.email, password);
        res.status(201).json({ message: "User succsessfully created" })
    } catch (error) {
        next(error)
    }
}

// ###########################

export const updateUser = async (req, res, next) => {
    const { userId, role } = req.user;
    const { id } = req.params;

    // Check if the user is trying to update their own profile or is an admin
    if (userId !== id && role !== "admin") {
        const error = new Error();
        error.detail = 'Only Admin or User can change User Profile'
        error.status = 401;
        return next(error);
    }

    try {
        const updatingUser = await User.findById(id);
        const prevRole = updatingUser.role;

        // If the user is not an admin, prevent them from changing their role
        if (role !== "admin") {
            req.body.role = prevRole;
        }

        // Check if the password is being updated
        if (req.body.password) {
            // Hash the new password provided in req.body.password
            const newPassword = req.body.password
            req.body.password = await hashPassword(req.body.password);
            // Send the new password to the user
            sendPassword(updatingUser.email, newPassword);
        } else {
            // Ensure the password remains unchanged unless explicitly updated by an admin
            req.body.password = updatingUser.password;
        }

        // Update the user with the request body
        Object.assign(updatingUser, req.body);

        await updatingUser.save();
        res.status(200).json({ message: "User updated" });
    } catch (error) {
        next(error);
    }
}


export const getAllUsers = async (req, res, next) => {
    res.status(200).json(await User.find())
}

