import axios from "axios";
import jwt from "jsonwebtoken";

export default {
    async doGetUser({ commit, rootState, dispatch }) {
        if (rootState.AuthModule.accessToken === null) return;

        // sprase jwt
        let decoded = jwt.decode(rootState.AuthModule.accessToken);
        let {userId} = decoded;

        // get user info
        let user = await axios
            .get("http://localhost:3000/api/users"+`/${userId}`, {
                headers: {
                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                },
            })
            .then((response) => {
                commit("updateUser", response.data);
                return response.data;
            })
            .catch(async (error) => {
                console.log(error.response.data);
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN") {
                    await dispatch("AuthModule/doRefresh", null, { root: true });
                    return await axios
                        .get("http://localhost:3000/api/users", {
                            headers: {
                                Authorization: "Bearer " + rootState.AuthModule.accessToken,
                            },
                        })
                        .then((response) => {
                            commit("updateUser", response.data);
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
            let temp = await axios.get(`http://localhost:3000/api/users/${user.user_id}/point`).then((response) => {
                return response.data;
            });
            user.point = temp.point;
        }
    },

    /*
    PUT /api/users
    { id (token), { username?, email?, ... } } -> { { username?, email?, ...} }
    */
    async editUser({ commit, rootState, dispatch, state }, payload) {
        if (rootState.AuthModule.accessToken === null) return;

        // call with updated info
        let user = await axios
            .put("http://localhost:3000/api/users", {
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
                        .get("http://localhost:3000/api/users", {
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
