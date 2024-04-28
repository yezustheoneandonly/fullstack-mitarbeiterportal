import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    deadline: { type: Date },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            isTeamlead: { type: Boolean, default: false },
            _id: false
        }
    ],
}, { versionKey: false })

const Project = mongoose.model("projects", projectSchema);

export default Project;