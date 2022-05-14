import http from './http-common';
import authHeader from "./auth-header";

class ProgramProxy {
    async createProgram(data) {
        return await http.post(`/program`, data, { headers: authHeader() });
    }
    async searchProgram(programId, userId) {
        let query = '?';
        if (userId) query += `${query.length === 1 ? `userId=${userId}` : `&userId=${userId}`}`;
        if (programId) query += `${query.length === 1 ? `programId=${programId}` : `&programId=${programId}`}`;

        return await http.get(`/program${query}`, { headers: authHeader() })
    }
    async updateProgram(data) {
        return await http.put(`/program`, data, { headers: authHeader() })
    }
    async deleteProgram(id) {
        return await http.delete(`/program/${id}`, { headers: authHeader() })
    }
}

export default new ProgramProxy();
