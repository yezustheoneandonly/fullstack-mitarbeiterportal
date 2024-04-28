import { set } from 'mongoose';
import { ProjectService } from './api/api.js';

const ProjectInstance = new ProjectService();

const [project, setProject] = useState();

const handleCreateProject = async () => {
    try {
        const project = { project PROPS HERE }
        const result = await ProjectInstance.createProject(project)
        setProject(result)
    } catch (error) {

    }
};