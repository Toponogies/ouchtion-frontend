import { showSnack } from "@/utils/showSnack";
import { jwtGetPayload } from "@/utils/jwtGetPayload";
import { getCurrentUser, updateCurrentUser, updateEmailCurrentUser, updateEmailWithToken, updatePasswordCurrentUser } from "@/api/currentUser";
import { getUserWithPoint } from "@/api/user";

export default {
    async doGetUser({ commit, rootState }) {
        if (rootState.AuthModule.accessToken === null) return;

        // parse JWT
        const payload = await jwtGetPayload(rootState.AuthModule.accessToken);
        const { userId } = payload;

        let user = undefined;
        // get user info
        try {
            user = await getCurrentUser(rootState.AuthModule.accessToken,userId);
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

    /*
    PUT /api/users
    { id (token), { username?, email?, ... } } -> { { username?, email?, ...} }
    */
    async editUser({ rootState, dispatch, state }, payload) {
        if (rootState.AuthModule.accessToken === null) return;

        try {
            if (payload.email)
            {
                let check = await updateEmailCurrentUser(rootState.AuthModule.accessToken,state.id,payload);
                if (check !== true)
                {
                    showSnack("Can't send to new user email");
                }
                showSnack("Email send check and update email");
                delete payload.email;
            }

            let user = null;

            // call with updated info
            try {
                user = await updateCurrentUser(rootState.AuthModule.accessToken,state.id,payload);
            } catch (error) {
                console.log(error);
            }


            if (user !== true)
            {
                showSnack("Can't update user");
                return;
            }
        } catch (error) {
            console.log(error);
        }

        // if successful, update the user again in store
        dispatch("CurrentUserModule/doGetUser", null, { root: true });
    },

    async editPassword({ rootState, state }, payload) {
        if (rootState.AuthModule.accessToken === null) return;

        let user = null;

        // call with updated info
        try {
            user = await updatePasswordCurrentUser(rootState.AuthModule.accessToken,state.id,payload)
        } catch (error) {
            console.log(error);
        }


        if (user !== true)
        {
            showSnack("Can't update password user");
            return;
        }
        showSnack("Update password user");
    },

    async doUpdateEmail(_context, token) {
        try {
            await updateEmailWithToken(token);
            setTimeout(() => {
                showSnack(`Update success`);
            }, 250);
        } catch (error) {
            console.log(error.response);
            setTimeout(() => {
                showSnack(`Can't update`);
            }, 250);
        }
    },


    logOutUser({ commit }) {
        commit("clearUser");
    },
};
