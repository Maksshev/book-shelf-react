import axios from "axios/index";

export default function () {

    const checkAuth = async () => {
        const isAuthRequest = await axios.get('/api/users/auth');
        return isAuthRequest.data;
    };


    return {
        checkAuth: checkAuth
    }
}