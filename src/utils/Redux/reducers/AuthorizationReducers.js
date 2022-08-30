import React from "react";
import axios from "axios";
import {baseUrl} from "../../Urls";

const endpoint = `${baseUrl()}/users`;

export const getCustomerById = async (id) => axios.get(`${endpoint}/${id}`);

const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : "";
const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : "";

export const AUTH_USER = getCustomerById(userId);



export const initialState = {
    user: "" || AUTH_USER,
    token: "" || token,
    loading: false,
    errorMessage: null
};

export const AuthorizationReducers = (initialState, action) => {
    switch (action.type) {
        case "REQUEST_LOGIN":
            return {
                ...initialState,
                loading: true
            };
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                user: action.payload.user,
                token: action.payload.auth_token,
                loading: false
            };
        case "LOGOUT":
            return {
                ...initialState,
                user: "",
                token: ""
            };

        case "LOGIN_ERROR":
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
