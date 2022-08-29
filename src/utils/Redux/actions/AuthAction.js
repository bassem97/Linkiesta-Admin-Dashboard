import axios from "axios";
import {baseUrl} from "../../Urls";


const endpoint = `${baseUrl()}/users/login`;

export async function loginUser(dispatch, loginPayload) {
    const headers = {
        'Access-Control-Allow-Origin': `${endpoint}`,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, access-control-allow-origin,access-control-allow-methods,access-control-allow-headers',
    };


    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        const { data } = await axios.post(`${endpoint}`, loginPayload, { headers });
        if (data) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            localStorage.setItem('user', JSON.stringify(data));
            return data
        }

        dispatch({ type: 'LOGIN_ERROR', error: data.error });
        return data.error ;
    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error });
    }

}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
}
