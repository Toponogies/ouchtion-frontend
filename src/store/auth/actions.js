import { API_ENDPOINTS } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";
import axios from "axios";

export default {
    doLogin({ commit, dispatch }, loginData) {
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
                commit("updateRefreshToken", response.data.refresh_token);
                commit("setModalState", false);

                dispatch('CurrentUserModule/doGetUser', null, { root: true });
            })
            .catch((error) => {
                commit("loginStop", error.response.data);
                commit("updateAccessToken", null);
                commit("updateRefreshToken", null);
            });
    },
    doLogout({ commit,dispatch }) {
        localStorage.setItem("accessToken_ouchtion", null);
        localStorage.setItem("refreshToken_ouchtion", null);
        commit("updateAccessToken", null);
        commit("updateRefreshToken", null);
        dispatch('CurrentUserModule/logOutUser', null, { root: true });
    },
    fetchAccessToken({ commit, state, dispatch }) {
        if (state.accessToken === null)
        {
            commit("updateAccessToken", localStorage.getItem("accessToken_ouchtion"));
            commit("updateRefreshToken", localStorage.getItem("refreshToken_ouchtion"));
            dispatch('CurrentUserModule/doGetUser', null, { root: true });
        }
    },
    async doRefresh({ commit, state, dispatch }) {
        if (state.accessToken === null)
            return;
        axios
            .post(`${API_ENDPOINTS.AUTH}`+`/refresh`, {
                refresh_token: state.refreshToken,
            })
            .then((response) => {
                localStorage.setItem("accessToken_ouchtion", response.data.access_token);
                commit("refreshStop", null);
                commit("updateAccessToken", response.data.access_token);
            })
            .catch((error) => {
                console.log(error.response.data);
                commit("refreshStop", error.response.data);
                commit("updateAccessToken", null);
                dispatch('CurrentUserModule/doGetUser', null, { root: true });
            });
    },
    doRegister(_context, registerData) {
        axios
            .post(`${API_ENDPOINTS.AUTH}`+`/register`, {
                ...registerData,
            })
            .then(() => {
                setTimeout(() => {
                    showSnack(`Register success please check email to verify`);
                }, 250);
                return;
            })
            .catch(() => {
                setTimeout(() => {
                    showSnack(`Can't register`);
                }, 250);
               return;
            });
    },
    doVerify(_context, token) {
        axios
            .post(`${API_ENDPOINTS.AUTH}`+`/verify`, {token:token})
            .then(() => {
                setTimeout(() => {
                    showSnack(`Verify success`);
                }, 250);
                return;
            })
            .catch((error) => {
                console.log(error.response.data);
                setTimeout(() => {
                    showSnack(`Can't verify`);
                }, 250);
               return;
            });
    },
    doSendReset(_context, email) {
        axios
            .post(`${API_ENDPOINTS.AUTH}`+`/reset`, { email: email })
            .then(() => {
                setTimeout(() => {
                    showSnack(`Send reset to email success`);
                }, 250);
                return;
            })
            .catch(() => {
                setTimeout(() => {
                    showSnack(`Can't send email`);
                }, 250);
               return;
            });
    },
    doReset(_context, resetBody) {
        axios
            .put(`${API_ENDPOINTS.AUTH}`+`/reset`, {
                ...resetBody,
            })
            .then(() => {
                setTimeout(() => {
                    showSnack(`Password reset`);
                }, 250);
                return;
            })
            .catch(() => {
                setTimeout(() => {
                    showSnack(`Can't reset`);
                }, 250);
               return;
            });
    },
};