import { login, register, resetPassword, sendResetEmail, verify } from "@/api/auth";
import {
    getCurrentUser,
    updateCurrentUser,
    updateEmailCurrentUser,
    updatePasswordCurrentUser,
} from "@/api/currentUser";
import { requestSeller } from "@/api/upgradeRequest";
import { getUserWithPoint } from "@/api/user";
import { jwtGetPayload } from "@/api/utils/jwtGetPayload";
import { showSnack } from "@/utils/showSnack";

export default {
    async getUser({ commit, state }) {
        if (state.accessToken === null) return;

        // parse JWT
        const payload = await jwtGetPayload(state.accessToken);
        const { userId } = payload;

        let user = undefined;
        // get user info
        try {
            user = await getCurrentUser(state.accessToken, userId);
        } catch (error) {
            console.log(error);
        }

        // get user point
        if (user && user.user_id) {
            let temp = await getUserWithPoint(user.user_id);
            user.point = temp.point;
        }

        commit("updateUser", user);
    },

    async editInfo({ dispatch, state }, payload) {
        if (state.accessToken === null) return;

        try {
            if (payload.email) {
                let check = await updateEmailCurrentUser(state.accessToken, state.id, payload);
                if (check !== true) {
                    showSnack(`Failed to send verification mail to the new address`);
                }
                showSnack(`Verification mail sent to the new address`);
                delete payload.email;
                return;
            }

            let user = null;

            // call with updated info
            try {
                user = await updateCurrentUser(state.accessToken, state.id, payload);
            } catch (error) {
                console.log(error);
            }

            if (user !== true) {
                showSnack("Failed to update user");
                return;
            }
            showSnack("Updated user profile");
        } catch (error) {
            console.log(error);
            showSnack("Failed update user");
        }

        // if successful, update the user again in store
        dispatch("CurrentUserModule/doGetUser", null, { root: true });
    },

    async editPassword({ state }, payload) {
        if (state.accessToken === null) return;

        let user = null;

        // call with updated info
        try {
            user = await updatePasswordCurrentUser(state.accessToken, state.id, payload);
        } catch (error) {
            console.log(error);
        }

        if (user !== true) {
            showSnack("Failed to update user password");
            return;
        }
        showSnack("User password updated");
    },

    async sendUpgradeRequest(_, reason) {
        let check = await requestSeller(reason);
        if (check === true) {
            showSnack("Send request success");
        } else {
            showSnack("This request is exist");
        }
    },

    async login({ commit, dispatch }, loginData) {
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
            showSnack(`Login unsuccess`);
            commit("loginStop", error.response.data);
            commit("updateAccessToken", null);
            commit("updateRefreshToken", null);
        }
    },

    logout({ commit }) {
        // Remove tokens from localStorage
        localStorage.setItem("accessToken_ouchtion", null);
        localStorage.setItem("refreshToken_ouchtion", null);

        // Clear all related stores

        // Tokens & User info
        commit("clearAll");

        // Bidder's dashboard
        commit("BidderDashboardModule/clearAll", null, { root: true });
        commit("BidderWatchlistModule/clearAll", null, { root: true });

        // Seller's dashboard
        commit("SellerDashboardModule/clearAll", null, { root: true });
        commit("SellerProductCreatorModule/clearAll", null, { root: true });

        // Admin's dashboard
        commit("AdminProductsDashboardModule/clearAll", null, { root: true });
        commit("AdminUpgradeRequestsDashboardModule/clearAll", null, { root: true });
        commit("AdminUsersDashboardModule/clearAll", null, { root: true });
    },

    fetchAccessToken({ commit, state, dispatch }) {
        if (state.accessToken === null) {
            commit("updateAccessToken", localStorage.getItem("accessToken_ouchtion"));
            commit("updateRefreshToken", localStorage.getItem("refreshToken_ouchtion"));
            dispatch("CurrentUserModule/doGetUser", null, { root: true });
        }
    },

    async doRegister(_, registerData) {
        try {
            await register(registerData);
            showSnack(`Sign up sucessfully. Check your mail.`);
        } catch (error) {
            showSnack(`Failed to sign up`);
        }
    },

    async doVerify(_, token) {
        try {
            await verify(token);
            showSnack(`Verify success`);
        } catch (error) {
            console.log(error);
            showSnack(`Can't verify`);
        }
    },

    async doSendReset(_, email) {
        try {
            await sendResetEmail(email);
            showSnack(`Send reset to email success`);
        } catch (error) {
            showSnack(`Can't send email`);
        }
    },

    async doReset(_, resetBody) {
        try {
            await resetPassword(resetBody);
            showSnack(`Password reset`);
        } catch (error) {
            showSnack(`Can't reset`);
        }
    },
};
