import axios from 'axios';

export async function logUser({email, password}) {
    const logRequest = await axios.post('/api/users/login', {email, password});
    return {
        type: 'USER_LOG_IN',
        payload: logRequest.data
    }
}

export function clearLogInState() {
    return {
        type: 'CLEAR_USER_LOGIN',
        payload: null
    }
}

