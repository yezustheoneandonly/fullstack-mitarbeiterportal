import User from "../Models/UserModel.js"


export const roleChecker = async (req, res, next) => {
    const user = await User.findById(req.user.userId)
    req.user.role = user.role
    next()
}


