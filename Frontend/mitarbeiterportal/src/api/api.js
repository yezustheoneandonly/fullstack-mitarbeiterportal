import axios from "axios";

const API_Local = 'http://localhost:3001';
//const API_Public = 'https://bagend.onrender.com';

const API_URL = API_Local;


const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Ensure cookies are sent with the request
    headers: {
        'Content-Type': 'application/json',
    },
});

export class ProjectService {
    async createProject(project) {
        return await apiClient.post('/project/createproject', project)
            .then(response => {
                return response.data;
            });
    }

    async getProject(projectId) {
        return await apiClient.get(`/project/getproject/${projectId}`)
            .then(response => {
                return response.data;
            });
    }

    async getAllProject() {
        return await apiClient.get('/project/getallproject')
            .then(response => {
                return response.data;
            });
    }

    async updateProject(project) {
        return await apiClient.put(`/project/updateproject/${project._id}`, project)
            .then(response => {
                return response.data;
            });
    }

    async addMember(projectId, member) {
        return await apiClient.post(`/project/addmember/${projectId}`, member)
            .then(response => {
                return response.data;
            });
    }

    async getMember(projectId) {
        return await apiClient.get(`/project/getmember/${projectId}`)
            .then(response => {
                return response.data;
            });
    }

    async getNonMember(projectId) {
        return await apiClient.get(`/project/getnonmember/${projectId}`)
            .then(response => {
                return response.data;
            });
    }

}

export class AuthService {
    async login(user) {
        return await apiClient.post('/user/login', user)
            .then(response => {
                return response.data;
            });
    }

    async logout() {
        return await apiClient.get('/user/logout')
            .then(response => {
                return response.data;
            });
    }

    async checkInOut() {
        return await apiClient.post('/user/clockmein')
            .then(response => {
                return response.data;
            });
    }

    async addUser(user) {
        return apiClient.post('/user/createuser', user)
            .then(response => {
                return response.data;
            });
    }

    async updateUser(user) {
        return apiClient.put(`/user/updateuser/${user._id}`, user)
            .then(response => {
                return response.data;
            });
    }

    async getUserInfo() {
        return await apiClient.get('/user/whoami')
            .then(response => {
                return response.data;
            });
    }

    async getAllUser() {
        return await apiClient.get('/user/getalluser')
            .then(response => {
                return response.data;
            });
    }
}


