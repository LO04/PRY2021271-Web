import http from './http-common';
import authHeader from "./auth-header";

class ScreenshotProxy {
    async createScreenshot(data) {
        return await http.post(`/screenshot`, data, { headers: authHeader() });
    }
    async searchScreenshot(userId, screenshotId) {
        let query = '?';
        if (userId) query += `${query.length === 1 ? `userId=${userId}` : `&userId=${userId}`}`;
        if (screenshotId) query += `${query.length === 1 ? `screenshotId=${screenshotId}` : `&screenshotId=${screenshotId}`}`;

        return await http.get(`/screenshot${query}`, { headers: authHeader() })
    }
    async deleteScreenshot(id) {
        return await http.delete(`/screenshot/${id}`, { headers: authHeader() })
    }
}

export default new ScreenshotProxy();
