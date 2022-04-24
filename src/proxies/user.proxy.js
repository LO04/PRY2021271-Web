import http from './http-common';
import authHeader from "./auth-header";

class UserProxy {
    async createUser(data) {
        return await http.post(`/user`, data);
    }
    async searchUser(email, userId, managerId) {
        let query = '?';
        if (email) query += `${query.length === 1 ? `email=${email}` : `&email=${email}`}`;
        if (userId) query += `${query.length === 1 ? `userId=${userId}` : `&userId=${userId}`}`;
        if (managerId) query += `${query.length === 1 ? `managerId=${managerId}` : `&managerId=${managerId}`}`;

        return await http.get(`/user${query}`, { headers: authHeader() })
    }
    async updateUser(data) {
        return await http.put(`/user`, data, { headers: authHeader() })
    }
}

export default new UserProxy();
