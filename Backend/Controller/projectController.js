import Project from "../Models/projectModel.js";
import User from "../Models/UserModel.js";

// Create Project
export const createProject = async (req, res, next) => {
    if (req.user.role === 'employee') {
        const error = new Error()
        error.detail = 'Only Admin and Teamlead can create new Projects'
        error.status = 401;
        return next(error)
    }
    const existingProject = await Project.findOne({ name: req.body.name });
    if (existingProject) {
        const error = new Error();
        error.detail = 'Project Name is already in use';
        error.status = 409;
        return next(error)
    }

    const project = new Project(req.body)
    project.creatorId = req.user.userId
    project.members = [...project.members, { userId: req.user.userId, isTeamlead: true }]

    try {
        await project.save()
        res.status(201).json({ message: "Project succsessfully created" })
    } catch (error) {
        next(error)
    }

}


// Edit Project by id
export const updateProject = async (req, res, next) => {
    const project = await Project.findById(req.params.id);

    const currentUserId = project.members.find(user => user.userId.toString() === req.user.userId.toString())
    if (!currentUserId?.isTeamlead && req.user.role !== "admin") {
        const error = new Error()
        error.detail = 'Only Admin and Teamlead can add Members'
        error.status = 401;
        return next(error)
    }



    const existingProject = await Project.findOne({ name: req.body.name });


    if (existingProject && existingProject._id.toString() !== req.params.id) {
        const error = new Error();
        error.detail = 'Project Name is already in use';
        error.status = 409;
        return next(error)
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.deadline = req.body.deadline || project.deadline;
    project.members = req.body.members || project.members;

    try {
        await project.save();
        res.status(200).json({ message: "Project successfully updated" });
    } catch (error) {
        next(error);
    }

}
// Get all Projects

export const getAllProjects = async (req, res, next) => {
    res.status(200).json(await Project.find())
}

//  Get Project by ID
export const getProjectById = async (req, res, next) => {
    res.status(200).json(await Project.findById(req.params.id))
}


//  Get all Members by Project id
export const getMembers = async (req, res, next) => {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project.members)
}
//  Add member to a project
export const addMember = async (req, res, next) => {
    const project = await Project.findById(req.params.id);
    const currentUserId = project.members.find(user => user.userId.toString() === req.user.userId.toString())

    if (!currentUserId?.isTeamlead) {
        const error = new Error()
        error.detail = 'Only Admin and Teamlead can add Members'
        error.status = 401;
        return next(error)
    }

    try {
        project.members.push(req.body)
        project.save()
        res.status(200).json({ message: "User added to the project" })
    } catch (error) {
        next(error)
    }

}

export const getNonMembers = async (req, res, next) => {
    try {
        // Fetch all users
        const allUsers = await User.find();
        // Fetch members of the project
        const project = await Project.findById(req.params.id);
        const projectMembers = project.members;

        // Convert project members to a set for efficient lookup
        const projectMembersSet = new Set(projectMembers.map(member => member._id.toString()));

        // Filter out users who are already members of the project
        const nonMembers = allUsers.filter(user => !projectMembersSet.has(user._id.toString()));

        res.status(200).json(nonMembers);
    } catch (error) {
        next(error)
    }
}


