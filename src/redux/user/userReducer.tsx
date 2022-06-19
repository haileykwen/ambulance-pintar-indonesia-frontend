import {
    SAVE_USER_DATA
} from './userTypes';

const initialState = {
    data: null
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVE_USER_DATA:
            return {
                ...state,
                data: action.payload
            };
        default: 
            return state;
    };
};

export default userReducer;