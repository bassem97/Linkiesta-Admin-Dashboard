import axios from "axios";
import {baseUrl} from "../Urls";

const endpoint = `${baseUrl()}users`;

const headers = {
    'Access-Control-Allow-Origin': `${endpoint}`,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, access-control-allow-origin,access-control-allow-methods,access-control-allow-headers',
};

export const forgetPassword = (email) => axios.post(`${endpoint}/forget-password`, email, {headers});
export const resetPassword = ({payload}) => axios.post(`${endpoint}/reset-password`, payload, {headers});

