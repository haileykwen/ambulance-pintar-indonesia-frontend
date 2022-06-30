import { API } from "../../config/Url";
import { apiClient } from "../ApiCore";

export const API_GET_ITEMS = (data: any, callbackSuccess: any, callbackError: any) => {
    apiClient().get(`${API.ITEM}`, data).then((resp: any) => {
        if (resp?.error === false) {
            callbackSuccess && callbackSuccess(resp);
        } else {
            callbackError && callbackError(resp);
        };
    });
};

export const API_DELETE_ITEMS = (id: any, callbackSuccess: any, callbackError: any) => {
    apiClient().delete(`${API.ITEM}/${id}`).then((resp: any) => {
        if (resp?.error === false) {
            callbackSuccess && callbackSuccess(resp);
        } else {
            callbackError && callbackError(resp);
        };
    });
};

export const API_GET_RESTOCKS = (data: any, callbackSuccess: any, callbackError: any) => {
    apiClient().get(`${API.RESTOCK}`, data).then((resp: any) => {
        if (resp?.error === false) {
            callbackSuccess && callbackSuccess(resp);
        } else {
            callbackError && callbackError(resp);
        };
    });
};

export const API_GET_SPENDS = (data: any, callbackSuccess: any, callbackError: any) => {
    apiClient().get(`${API.SPEND}`, data).then((resp: any) => {
        if (resp?.error === false) {
            callbackSuccess && callbackSuccess(resp);
        } else {
            callbackError && callbackError(resp);
        };
    });
};

export const API_GET_LOGS = (data: any, callbackSuccess: any, callbackError: any) => {
    apiClient().get(`${API.LOG}`, data).then((resp: any) => {
        if (resp?.error === false) {
            callbackSuccess && callbackSuccess(resp);
        } else {
            callbackError && callbackError(resp);
        };
    });
};

export const API_RESTOCKS = (data: any, callbackSuccess: any, callbackError: any) => {
    apiClient().post(`${API.RESTOCK}`, data).then((resp: any) => {
        if (resp?.error === false) {
            callbackSuccess && callbackSuccess(resp);
        } else {
            callbackError && callbackError(resp);
        };
    });
};

export const API_SPEND = (data: any, callbackSuccess: any, callbackError: any) => {
    apiClient().post(`${API.SPEND}`, data).then((resp: any) => {
        if (resp?.error === false) {
            callbackSuccess && callbackSuccess(resp);
        } else {
            callbackError && callbackError(resp);
        };
    });
};

export const API_ADD_ITEM = (data: any, callbackSuccess: any, callbackError: any) => {
    apiClient().post(`${API.ITEM}`, data).then((resp: any) => {
        if (resp?.error === false) {
            callbackSuccess && callbackSuccess(resp);
        } else {
            callbackError && callbackError(resp);
        };
    });
};