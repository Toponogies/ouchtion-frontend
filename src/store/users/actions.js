import { showSnack } from "@/utils/showSnack";
import { fromTimestamp } from "@/utils/timeUtils";
import { API_ENDPOINTS } from "@/utils/constants";

import axios from "axios";

export default {
    async fetchAll({ commit, dispatch, rootState }) {
        commit("setIsLoading", true);
        // call API
        const data = [];

        let users = await axios
            .get(`${API_ENDPOINTS.USERS}`, {
                headers: {
                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch(async (error) => {
                console.log(error);
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
                            console.log(error);
                            return [];
                        });
                }
            });

        users?.forEach((user) => {
            data.push({
                id: user.user_id,
                full_name: user.full_name,
                email: user.email,
                address: user.address,
                dob: user.dob,
                is_active: user.is_active,
                role: user.role,
            });
        });

        commit("setUsers", data);
        commit("setIsLoading", false);
    },

    async create({ commit, dispatch, rootState }, payload) {
        commit("setIsLoading", true);

        // change date
        let { date } = fromTimestamp(payload.dob);
        payload.dob = date;
        // call API
        let user = await axios
            .post(
                `${API_ENDPOINTS.USERS}`,
                {
                    ...payload,
                    role: "bidder",
                    is_active: "1",
                },
                {
                    headers: {
                        Authorization: "Bearer " + rootState.AuthModule.accessToken,
                    },
                }
            )
            .then((response) => {
                return response.data;
            })
            .catch(async (error) => {
                console.log(error);
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN") {
                    await dispatch("AuthModule/doRefresh", null, { root: true });
                    return await axios
                        .get(
                            `${API_ENDPOINTS.USERS}`,
                            {
                                ...payload,
                                role: "bidder",
                                is_active: "1",
                            },
                            {
                                headers: {
                                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                                },
                            }
                        )
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                            return undefined;
                        });
                }
            });

        if (user === undefined || user === null) {
            showSnack("Can't create user");
            return;
        }

        // get user id
        console.log(user);
        const newId = user.user_id;
        const targetPayload = {
            ...payload,
            id: newId,
        };

        // Remove password before pushing to the store...
        const password = targetPayload.password;
        delete targetPayload.password;
        commit("createUser", targetPayload);
        // ...then call set password on a separate action
        dispatch("updatePassword", {
            id: newId,
            password,
        });
        commit("setIsLoading", false);
        showSnack(`Created user id = ${newId}`);
    },

    async update({ commit, rootState, dispatch }, payload) {
        commit("setIsLoading", true);

        // new payload
        let payloadTemp = payload;

        // id
        let id = payloadTemp.id;

        // remove field id
        delete payloadTemp.id;

        // change date
        let { date } = fromTimestamp(payloadTemp.dob);
        payloadTemp.dob = date;

        // call API
        let user = await axios
            .put(
                `${API_ENDPOINTS.USERS}/${id}`,
                {
                    ...payloadTemp,
                },
                {
                    headers: {
                        Authorization: "Bearer " + rootState.AuthModule.accessToken,
                    },
                }
            )
            .then((response) => {
                return response.data;
            })
            .catch(async (error) => {
                console.log(error);
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN") {
                    await dispatch("AuthModule/doRefresh", null, { root: true });
                    return await axios
                        .get(
                            `${API_ENDPOINTS.USERS}` + `/${id}`,
                            {
                                ...payloadTemp,
                            },
                            {
                                headers: {
                                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                                },
                            }
                        )
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                            return undefined;
                        });
                }
            });

        if (user === undefined || user === null) {
            commit("setIsLoading", false);
            showSnack("Can't update user");
            return;
        }

        commit("updateUser", payload);
        commit("setIsLoading", false);
        showSnack(`Updated user id = ${id}`);
    },

    async updatePassword({ commit, rootState }, { id, password }) {
        commit("setIsLoading", true);
        const headers = {
            Authorization: "Bearer " + rootState.AuthModule.accessToken,
        };
        const payload = {
            password,
        };
        await axios
            .put(`${API_ENDPOINTS.USERS}/${id}`, payload, { headers })
            .then((res) => res.data)
            .catch((err) => {
                console.log(err);
                showSnack(`Cannot set password for user ${id}`);
            });

        commit("setIsLoading", false);
    },

    delete({ commit }, id) {
        commit("setIsLoading", true);
        // call API
        commit("deleteUser", id);
        commit("setIsLoading", false);
        showSnack(`Deleted user id = ${id}`);
    },

    async setAsBidder({ commit, rootState, dispatch }, id) {
        commit("setIsLoading", true);
        // call API
        let user = await axios
            .put(
                `${API_ENDPOINTS.USERS}` + `/admin/role`,
                {
                    user_id: id + "",
                    role: "bidder",
                },
                {
                    headers: {
                        Authorization: "Bearer " + rootState.AuthModule.accessToken,
                    },
                }
            )
            .then((response) => {
                return response.data;
            })
            .catch(async (error) => {
                console.log(error);
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN") {
                    await dispatch("AuthModule/doRefresh", null, { root: true });
                    return await axios
                        .get(
                            `${API_ENDPOINTS.USERS}` + `/admin/role`,
                            {
                                user_id: id + "",
                                role: "bidder",
                            },
                            {
                                headers: {
                                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                                },
                            }
                        )
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                            return undefined;
                        });
                }
            });

        if (user === undefined || user === null) {
            commit("setIsLoading", false);
            showSnack(`Can't user id = ${id} as bidder`);
            return;
        }

        commit("setUserAsBidder", id);
        commit("setIsLoading", false);
        showSnack(`Set user id = ${id} as bidder`);
    },

    async setAsSeller({ commit, rootState, dispatch }, id) {
        commit("setIsLoading", true);
        // call API
        let user = await axios
            .put(
                `${API_ENDPOINTS.USERS}` + `/admin/role`,
                {
                    user_id: id + "",
                    role: "seller",
                },
                {
                    headers: {
                        Authorization: "Bearer " + rootState.AuthModule.accessToken,
                    },
                }
            )
            .then((response) => {
                return response.data;
            })
            .catch(async (error) => {
                console.log(error);
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN") {
                    await dispatch("AuthModule/doRefresh", null, { root: true });
                    return await axios
                        .get(
                            `${API_ENDPOINTS.USERS}` + `/admin/role`,
                            {
                                user_id: id + "",
                                role: "seller",
                            },
                            {
                                headers: {
                                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                                },
                            }
                        )
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                            return undefined;
                        });
                }
            });

        if (user === undefined || user === null) {
            commit("setIsLoading", false);
            showSnack(`Can't user id = ${id} as bidder`);
            return;
        }

        commit("setUserAdSeller", id);
        commit("setIsLoading", false);
        showSnack(`Set user id = ${id} as seller`);
    },

    async fetchUpgradeRequests({ commit, rootState, dispatch }) {
        commit("setIsLoading", true);
        const data = [];

        let requests = await axios
            .get(`${API_ENDPOINTS.USERS}` + `/admin/request`, {
                headers: {
                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch(async (error) => {
                console.log(error);
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN") {
                    await dispatch("AuthModule/doRefresh", null, { root: true });
                    return await axios
                        .get(`${API_ENDPOINTS.USERS}` + `/admin/request`, {
                            headers: {
                                Authorization: "Bearer " + rootState.AuthModule.accessToken,
                            },
                        })
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                            return undefined;
                        });
                }
            });

        requests?.forEach(async (request) => {
            let user = await axios
                .get(`${API_ENDPOINTS.USERS}` + `/${request.user_id}`, {
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
                            .get(`${API_ENDPOINTS.USERS}` + `/${request.user_id}`, {
                                headers: {
                                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                                },
                            })
                            .then((response) => {
                                return response.data;
                            })
                            .catch((error) => {
                                console.log(error);
                                return undefined;
                            });
                    }
                });

            let { point } = await axios.get(`${API_ENDPOINTS.USERS}` + `/${request.user_id}/point`).then((response) => {
                return response.data;
            });

            data.push({
                userId: request.user_id,
                full_name: user.full_name,
                email: user.email,
                rating: point,
                time: request.time,
                reason: request.reason,
            });
        });

        setTimeout(() => {
            commit("setUpgradeRequests", data);
            commit("setIsLoading", false);
        }, 500);
    },

    acceptRequest({ commit, dispatch }, id) {
        commit("setIsLoading", false);
        setTimeout(() => {
            dispatch("setAsSeller", id);
            dispatch("deleteRequest", id);
            commit("removeUpgradeRequest", id);
            commit("setIsLoading", false);
        }, 250);
    },

    async rejectRequest({ commit, dispatch }, id) {
        commit("setIsLoading", false);
        setTimeout(() => {
            dispatch("deleteRequest", id);
            commit("setIsLoading", false);
            showSnack(`Rejected request from user ${id}`);
        }, 250);
    },

    async deleteRequest({ commit, rootState, dispatch }, id) {
        await axios
            .delete(`${API_ENDPOINTS.USERS}` + `/admin/request/${id}`, {
                headers: {
                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch(async (error) => {
                console.log(error);
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN") {
                    await dispatch("AuthModule/doRefresh", null, { root: true });
                    return await axios
                        .delete(`${API_ENDPOINTS.USERS}` + `/admin/request/${id}`, {
                            headers: {
                                Authorization: "Bearer " + rootState.AuthModule.accessToken,
                            },
                        })
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                            return undefined;
                        });
                }
            });
        setTimeout(() => {
            commit("removeUpgradeRequest", id);
        }, 250);
    },
};
