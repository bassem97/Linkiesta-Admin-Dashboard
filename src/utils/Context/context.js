import React, { useReducer } from "react";
import { AuthorizationReducers, initialState } from "../Redux/reducers/AuthorizationReducers";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();


export function useAuthState() {
    const context = React.useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }

    return context;
}

export function useAuthDispatch() {
    const context = React.useContext(AuthDispatchContext);
    if (context === undefined) {
        throw new Error("useAuthDispatch must be used within a AuthProvider");
    }

    return context;
}

export const AuthProvider = ({children}) => {
    const [user, dispatch] = useReducer(AuthorizationReducers, initialState);
    console.log(user)

    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};
