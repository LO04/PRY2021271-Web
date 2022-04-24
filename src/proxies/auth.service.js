import http from './http-common'

class AuthService {
    login(user) {
        return http.post( `/user/authenticate`, {
            email: user.email,
            password: user.password
        }).then(response => {
            if (response.data.token) {
                sessionStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    logout() {
        sessionStorage.removeItem('user');
    }
}

export default new AuthService();
