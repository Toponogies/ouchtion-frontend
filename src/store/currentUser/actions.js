import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";
import { showSnack } from "@/utils/showSnack";
import { jwtGetPayload } from "@/utils/jwtGetPayload";

export default {
    async doGetUser({ commit, rootState, dispatch }) {
        if (rootState.AuthModule.accessToken === null) return;

        // parse JWT
        const payload = await jwtGetPayload(rootState.AuthModule.accessToken);
        const { userId } = payload;

        // get user info
        let user = await axios
            .get(`${API_ENDPOINTS.USERS}/${userId}`, {
                headers: {
                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch(async (error) => {
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN") {
                    await dispatch("AuthModule/doRefresh", null, { root: true });
                    return await axios
                        .get(`${API_ENDPOINTS.USERS}/${userId}`, {
                            headers: {
                                Authorization: "Bearer " + rootState.AuthModule.accessToken,
                            },
                        })
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                            return null;
                        });
                }
            });

        // get user point
        if (user && user.user_id) {
            let temp = await axios.get(`${API_ENDPOINTS.USERS}/${user.user_id}/point`).then((response) => {
                return response.data;
            });
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

        if (payload.email)
        {
            let check = await axios
            .post(`${API_ENDPOINTS.USERS}`+`/${state.id}/email`, 
            {
                ...payload,
            }, 
            {
                headers: {
                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                },
            })
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.log(error.response);
                return null;
            });
            if (check !== true)
            {
                showSnack("Can't send to new user email");
                return;
            }
            showSnack("Email send check and update email");
            return;
        }

        // call with updated info
        let user = await axios
            .put(`${API_ENDPOINTS.USERS}`+`/${state.id}`, 
            {
                ...payload,
            }, 
            {
                headers: {
                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                },
            })
            .then(() => {
                return true;
            })
            .catch(async (error) => {
                console.log(error.response);
                return null;
            });

        if (user !== true)
        {
            showSnack("Can't update user");
            return;
        }


        // if successful, update the user again in store
        dispatch("CurrentUserModule/doGetUser", null, { root: true });
    },

    async editPassword({ rootState, dispatch, state }, payload) {
        if (rootState.AuthModule.accessToken === null) return;

        // call with updated info
        let user = await axios
            .put(`${API_ENDPOINTS.USERS}`+`/${state.id}/changePassword`, 
            {
                ...payload,
            }, 
            {
                headers: {
                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                },
            })
            .then(() => {
                return true;
            })
            .catch(async (error) => {
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN") {
                    await dispatch("AuthModule/doRefresh", null, { root: true });
                    return await axios
                        .put(`${API_ENDPOINTS.USERS}`+`/${state.id}/changePassword`, 
                        {
                            ...payload,
                        }, 
                        {
                            headers: {
                                Authorization: "Bearer " + rootState.AuthModule.accessToken,
                            },
                        })
                        .then(() => {
                            return true;
                        })
                        .catch((error) => {
                            console.log(error);
                            return null;
                        });
                }
            });

        if (user !== true)
        {
            showSnack("Can't update password user");
            return;
        }
        showSnack("Update password user");
    },

    doUpdateEmail(_context, token) {
        axios
            .put(`${API_ENDPOINTS.USERS}` + `/user/email`, { token: token })
            .then(() => {
                setTimeout(() => {
                    showSnack(`Update success`);
                }, 250);
                return;
            })
            .catch((error) => {
                console.log(error.response);
                setTimeout(() => {
                    showSnack(`Can't update`);
                }, 250);
                return;
            });
    },


    logOutUser({ commit }) {
        commit("clearUser");
    },
};
