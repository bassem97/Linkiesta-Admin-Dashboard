// ----------------------------------------------------------------------

import React from 'react';
import {getCustomerById} from "../utils/Redux/reducers/AuthorizationReducers";


const getUser = JSON.parse(localStorage.getItem('user'));
let user;


console.log(getCustomerById(getUser.id).finally())


const account = {
    displayName: `${user?.firstName} ${user?.lastName}`,
    email:  user?.email,
    photoURL: '/static/mock-images/avatars/avatar_default.jpg',
    role: user?.role,
};

export default account;
