import http from './http-common';
import authHeader from "./auth-header";

class UrlProxy {
    async createUrl(data) {
        return await http.post(`/url`, data, { headers: authHeader() });
    }
    async createUrlsByList(data) {
        return await http.post(`/url/by/list`, data, { headers: authHeader() });
    }
    async searchUrl(urlId, userId) {
        let query = '?';
        if (userId) query += `${query.length === 1 ? `userId=${userId}` : `&userId=${userId}`}`;
        if (urlId) query += `${query.length === 1 ? `urlId=${urlId}` : `&urlId=${urlId}`}`;

        return await http.get(`/url${query}`, { headers: authHeader() })
    }
    async updateUrl(data) {
        return await http.put(`/url`, data, { headers: authHeader() })
    }
    async deleteUrl(id) {
        return await http.delete(`/url/${id}`, { headers: authHeader() })
    }
}

export default new UrlProxy();
