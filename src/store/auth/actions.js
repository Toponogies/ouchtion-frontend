import axios from "axios";

export default {
    async doLogin({ commit }, loginData) {
        commit("loginStart");

        axios
            .post("http://localhost:3000/api/auth", {
                ...loginData,
            })
            .then((response) => {
                localStorage.setItem("accessToken_ouchtion", response.data.accessToken);
                localStorage.setItem("refreshToken_ouchtion", response.data.refreshToken);

                commit("loginStop", null);
                commit("updateAccessToken", response.data.accessToken);
                commit("updateRefreshToken", response.data.refreshToken);
                commit("setModalState", false);
            })
            .catch((error) => {
                commit("loginStop", error.response.data);
                commit("updateAccessToken", null);
                commit("updateRefreshToken", null);
            });
    },
    doLogout({ commit }) {
        localStorage.setItem("accessToken_ouchtion", null);
        localStorage.setItem("refreshToken_ouchtion", null);
        commit("updateAccessToken", null);
        commit("updateRefreshToken", null);
    },
    fetchAccessToken({ commit, state }) {
        if (state.accessToken === null)
        {
            commit("updateAccessToken", localStorage.getItem("accessToken_ouchtion"));
            commit("updateRefreshToken", localStorage.getItem("refreshToken_ouchtion"));
        }
    },
    async doRefresh({ commit, state }) {
        axios
            .post("http://localhost:3000/api/auth/refresh", {
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
            });
    },
    doRegister({ commit }, registerData) {
        axios
            .post("http://localhost:3000/api/auth/register", {
                ...registerData,
            })
            .then()
            .catch((error) => {
                commit("registerStop", error.response.data);
            });
    },
    doVerify({ commit }, token) {
        axios
            .post("http://localhost:3000/api/auth/verify", null, { params: { token: token } })
            .then(()=> {
                commit("verifyStop", null);
            })
            .catch((error) => {
                commit("verifyStop", error.response.data);
            });
    },
    doSendReset({ commit }, email) {
        axios
            .post("http://localhost:3000/api/auth/reset", null, { params: { email: email } })
            .then(()=> {
                commit("resetStop", null);
            })
            .catch((error) => {
                commit("resetStop", error.response.data);
            });
    },
    doReset({ commit }, resetBody) {
        axios
            .put("http://localhost:3000/api/auth/reset", {
                ...resetBody,
            })
            .then(()=> {
                commit("resetStop", null);
            })
            .catch((error) => {
                commit("resetStop", error.response.data);
            });
    },
};
