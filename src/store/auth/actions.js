import { login, refresh, register, resetPassword, sendResetEmail, verify } from "@/api/auth";
import { showSnack } from "@/utils/showSnack";

export default {
    async doLogin({ commit, dispatch }, loginData) {
        commit("loginStart");
        try {
            let { access_token, refresh_token } = await login(loginData);
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
        // Remove tokens from localStorage
        localStorage.setItem("accessToken_ouchtion", null);
        localStorage.setItem("refreshToken_ouchtion", null);

        // Clear all related stores

        // Tokens & User info
        commit("AuthModule/clearAll", null, { root: true });
        commit("CurrentUserModule/clearUser", null, { root: true });

        // Bidder's dashboard
        commit("BiddingModule/clearAll", null, { root: true });
        commit("WatchlistModule/clearAll", null, { root: true });

        // Seller's dashboard
        commit("ProductModule/clearAll", null, { root: true });

        // Admin's dashboard
        commit("ProductsAdminModule/clearAll", null, { root: true });
        commit("UsersModule/clearAll", null, { root: true });
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
            let { access_token } = await refresh(state.refreshToken);
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
            showSnack(`Register success please check email to verify`);
        } catch (error) {
            showSnack(`Can't register`);
        }
    },

    async doVerify(_context, token) {
        try {
            await verify(token);
            showSnack(`Verify success`);
        } catch (error) {
            console.log(error);
            showSnack(`Can't verify`);
        }
    },
    async doSendReset(_context, email) {
        try {
            await sendResetEmail(email);
            showSnack(`Send reset to email success`);
        } catch (error) {
            showSnack(`Can't send email`);
        }
    },
    async doReset(_context, resetBody) {
        try {
            await resetPassword(resetBody);
            showSnack(`Password reset`);
        } catch (error) {
            showSnack(`Can't reset`);
        }
    },
};
