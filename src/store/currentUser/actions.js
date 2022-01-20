import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";
export default {
    async doGetUser({ commit, rootState, dispatch }) {
        if (rootState.AuthModule.accessToken === null) return;

        // get user info
        let user = await axios
            .get(`${API_ENDPOINTS.USERS}`, {
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
                        .get(`${API_ENDPOINTS.USERS}`, {
                            headers: {
                                Authorization: "Bearer " + rootState.AuthModule.accessToken,
                            },
                        })
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log(error.response.data);
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
    async editUser({ commit, rootState, dispatch, state }, payload) {
        if (rootState.AuthModule.accessToken === null) return;

        // call with updated info
        let user = await axios
            .put(`${API_ENDPOINTS.USERS}`, {
                headers: {
                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                },
                body: {
                    id: state.id,
                    ...payload,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch(async (error) => {
                console.log(error.response.data);
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN") {
                    await dispatch("AuthModule/doRefresh", null, { root: true });
                    return await axios
                        .get(`${API_ENDPOINTS.USERS}`, {
                            headers: {
                                Authorization: "Bearer " + rootState.AuthModule.accessToken,
                            },
                        })
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log(error.response.data);
                            return null;
                        });
                }
            });

        // if successful, update the user again in store
        commit("updateUser", user);
    },

    logOutUser({ commit }) {
        commit("clearUser");
    },
};
