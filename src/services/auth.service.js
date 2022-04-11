import http from './http-common'

class AuthService {
    login(user) {
        return http.post( `/user/authenticate`, {
            email: user.email,
            password: user.password
        }).then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();
