import http from './http-common';
import authHeader from "@/services/auth-header";

class UserService {
    createUser(data) {
        return http.post(`/user`, data);
    }
    getUserById(userId) {
        return http.get(`/user?userId=${userId}`, { headers: authHeader() })
    }
}

export default new UserService();
