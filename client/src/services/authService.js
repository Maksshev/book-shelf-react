import axios from "axios/index";

export default function (candidateEmail, candidatePassword) {
    const email = candidateEmail;
    const password = candidatePassword;

    const checkAuth = async () => {
        const isAuthRequest = await axios.get('/api/users/auth');
        return isAuthRequest.data.isAuth;
    };

    return {
        checkAuth: checkAuth
    }
}