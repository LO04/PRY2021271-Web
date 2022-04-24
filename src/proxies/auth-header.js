export default function authHeader() {
    let user = JSON.parse(sessionStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': `Bearer ${user.token}`};
    } else {
        return {};
    }
}
