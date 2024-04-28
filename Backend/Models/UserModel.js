import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String },
}, { versionKey: false });

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    registerDate: { type: Date, default: Date.now },
    contact: { type: contactSchema, required: true },
    role: {
        type: String,
        enum: ['employee', 'teamlead', 'admin'],
        default: 'employee'
    },
    checkedIn: { type: Boolean, default: false },


}, { versionKey: false });


userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.registerDate;
    delete obj.contact._id
    return obj;
}

const User = mongoose.model("users", userSchema);

export default User;
