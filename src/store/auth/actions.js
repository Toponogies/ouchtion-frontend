import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export default {
    async doLogin({ commit, dispatch }, loginData) {
        commit("loginStart");

        axios
            .post(`${API_ENDPOINTS.AUTH}`, {
                ...loginData,
            })
            .then((response) => {
                localStorage.setItem("accessToken_ouchtion", response.data.access_token);
                localStorage.setItem("refreshToken_ouchtion", response.data.refresh_token);

                commit("loginStop", null);
                commit("updateAccessToken", response.data.access_token);

                // extract id from access token, then decode using secret

                commit("updateRefreshToken", response.data.refresh_token);
                commit("setModalState", false);

                dispatch("CurrentUserModule/doGetUser", null, { root: true });
            })
            .catch((error) => {
                commit("loginStop", error.response.data);
                commit("updateAccessToken", null);
                commit("updateRefreshToken", null);
            });
    },

    doLogout({ commit, dispatch }) {
        localStorage.setItem("accessToken_ouchtion", null);
        localStorage.setItem("refreshToken_ouchtion", null);
        commit("updateAccessToken", null);
        commit("updateRefreshToken", null);
        dispatch("CurrentUserModule/logOutUser", null, { root: true });
    },

    fetchAccessToken({ commit, state, dispatch }) {
        if (state.accessToken === null) {
            commit("updateAccessToken", localStorage.getItem("accessToken_ouchtion"));
            commit("updateRefreshToken", localStorage.getItem("refreshToken_ouchtion"));
            dispatch("CurrentUserModule/doGetUser", null, { root: true });
        }
    },

    async doRefresh({ commit, state, dispatch }) {
        if (state.accessToken === null) return;
        axios
            .post(`${API_ENDPOINTS.AUTH}/refresh`, {
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
            })
            .then((response) => {
                localStorage.setItem("accessToken_ouchtion", response.data.accessToken);
                commit("refreshStop", null);
                commit("updateAccessToken", response.data.accessToken);
            })
            .catch((error) => {
                console.log(error.response.data);
                commit("refreshStop", error.response.data);
                commit("updateAccessToken", null);
                dispatch("CurrentUserModule/doGetUser", null, { root: true });
            });
    },

    doRegister({ commit }, registerData) {
        axios
            .post(`${API_ENDPOINTS.AUTH}/register`, {
                ...registerData,
            })
            .then()
            .catch((error) => {
                commit("registerStop", error.response.data);
            });
    },

    doVerify({ commit }, token) {
        axios
            .post(`${API_ENDPOINTS.AUTH}/verify`, null, { params: { token: token } })
            .then(() => {
                commit("verifyStop", null);
            })
            .catch((error) => {
                commit("verifyStop", error.response.data);
            });
    },

    doSendReset({ commit }, email) {
        axios
            .post(`${API_ENDPOINTS.AUTH}/reset`, null, { params: { email: email } })
            .then(() => {
                commit("resetStop", null);
            })
            .catch((error) => {
                commit("resetStop", error.response.data);
            });
    },

    doReset({ commit }, resetBody) {
        axios
            .put(`${API_ENDPOINTS.AUTH}/reset`, {
                ...resetBody,
            })
            .then(() => {
                commit("resetStop", null);
            })
            .catch((error) => {
                commit("resetStop", error.response.data);
            });
    },
};
