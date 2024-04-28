import User from "../Models/UserModel.js";
import CheckInOut from "../Models/CheckInOutModel.js";

export const checkInOut = async (req, res, next) => {
    const { userId } = req.user;
    try {
        // Find the user by ID
        const checkUser = await User.findById(userId);

        // Determine the check type based on the user's current check-in status
        const checkType = checkUser.checkedIn ? 'OUT' : 'IN';

        // Create a new CheckInOut 
        const checkInOut = new CheckInOut({
            user: userId, // Reference to the user
            checkType: checkType // 'In' or 'Out'
        });

        // Save the CheckInOut 
        await checkInOut.save();

        // Update the user's check-in status
        checkUser.checkedIn = !checkUser.checkedIn;
        await checkUser.save();

        res.status(200).json({ message: `You have checked ${checkType.toLowerCase()}` });
    } catch (error) {
        next(error);
    }
}
