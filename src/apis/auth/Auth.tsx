import { API } from "../../config/Url";
import { apiClient, getToken } from "../ApiCore";

export const API_SIGNIN = (data: any, callbackSuccess: any, callbackError: any) => {
    apiClient().post(`${API.SIGNIN}`, data).then((resp: any) => {
        if (resp?.error === false) {
            callbackSuccess && callbackSuccess(resp);
        } else {
            callbackError && callbackError(resp);
        };
    });
};

export const API_USER = (callbackSuccess: any, callbackError: any) => {
    apiClient().post(`${API.USER}`, {token: getToken()}).then((resp: any) => {
        if (resp?.error === false) {
            callbackSuccess && callbackSuccess(resp);
        } else {
            callbackError && callbackError(resp);
        };
    });
};