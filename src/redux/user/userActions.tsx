import {
    SAVE_USER_DATA
} from './userTypes';

export const saveUserData = (data: any) => {
    return {
        type: SAVE_USER_DATA,
        payload: data
    };
};