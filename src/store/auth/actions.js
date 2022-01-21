import { login, refresh, register, resetPassword, sendResetEmail, verify } from "@/api/auth";
import { showSnack } from "@/utils/showSnack";

export default {
    async doLogin({ commit, dispatch }, loginData) {
        commit("loginStart");
        try {
            let {access_token,refresh_token} = await login(loginData)
            localStorage.setItem("accessToken_ouchtion", access_token);
            localStorage.setItem("refreshToken_ouchtion", refresh_token);

            commit("loginStop", null);
            commit("updateAccessToken", access_token);
            commit("updateRefreshToken", refresh_token);
            commit("setModalState", false);

            dispatch("CurrentUserModule/doGetUser", null, { root: true });
        } catch (error) {
            setTimeout(() => {
                showSnack(`Login unsuccess`);
            }, 250);
            commit("loginStop", error.response.data);
            commit("updateAccessToken", null);
            commit("updateRefreshToken", null);
        }
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

        try {
            let {access_token} =  await refresh(state.refreshToken);
            localStorage.setItem("accessToken_ouchtion", access_token);
            commit("refreshStop", null);
            commit("updateAccessToken", access_token);
        } catch (error) {
            commit("refreshStop", error.response.data);
            commit("updateAccessToken", null);
            dispatch("CurrentUserModule/doGetUser", null, { root: true });
        }
    },

    async doRegister(_context, registerData) {
        try {
            await register(registerData);
            setTimeout(() => {
                showSnack(`Register success please check email to verify`);
            }, 250);
        } catch (error) {
            setTimeout(() => {
                showSnack(`Can't register`);
            }, 250);
        }
    },

    async doVerify(_context, token) {
        try {
            await verify(token);
            setTimeout(() => {
                showSnack(`Verify success`);
            }, 250);
        } catch (error) {
            console.log(error);
            setTimeout(() => {
                showSnack(`Can't verify`);
            }, 250);
        }
    },
    async doSendReset(_context, email) {
        try {
            await sendResetEmail(email);
            setTimeout(() => {
                showSnack(`Send reset to email success`);
            }, 250);
        } catch (error) {
            setTimeout(() => {
                showSnack(`Can't send email`);
            }, 250);
        }
    },
    async doReset(_context, resetBody) {
        try {
            await resetPassword(resetBody);
            setTimeout(() => {
                showSnack(`Password reset`);
            }, 250);
        } catch (error) {
            setTimeout(() => {
                showSnack(`Can't reset`);
            }, 250);
        }
    },
};
