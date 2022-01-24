import { showSnack } from "@/utils/showSnack";
import { fromTimestamp } from "@/utils/timeUtils";

import {
    createUser,
    getAllUser,
    getUser,
    getUserWithPoint,
    removeUser,
    updateEmailAdmin,
    updatePasswordAdmin,
    updateRole,
    updateUserAdmin,
} from "@/api/user";
import { deleteUpgradeRequests, getUpgradeRequests } from "@/api/upgradeRequest";

export default {
    async fetchAll({ commit, rootState }) {
        commit("setIsLoading", true);
        // call API
        const data = [];

        try {
            let users = await getAllUser(rootState.AuthModule.accessToken);

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
        } catch (error) {
            console.log(error);
        }

        commit("setUsers", data);
        commit("setIsLoading", false);
    },

    async create({ commit, rootState, dispatch }, payload) {
        commit("setIsLoading", true);

        // change date
        let { date } = fromTimestamp(payload.dob);
        payload.dob = date;
        let user = null;
        // call API
        try {
            user = await createUser(rootState.AuthModule.accessToken, payload);
        } catch (error) {
            console.log(error);
        }

        if (user === undefined || user === null) {
            showSnack("Can't create user");
            return;
        }

        // get user id
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

    async update({ commit, rootState }, payload) {
        commit("setIsLoading", true);

        // new payload
        let payloadTemp = {
            id: payload.id,
            full_name: payload.full_name,
            address: payload.address,
            dob: payload.dob,
        };

        // id
        let id = payloadTemp.id;

        // remove field id
        delete payloadTemp.id;
        delete payloadTemp.is_active;

        // change date
        let { date } = fromTimestamp(payloadTemp.dob);
        payloadTemp.dob = date;

        let user = null;
        // call API
        try {
            user = await updateUserAdmin(rootState.AuthModule.accessToken, id, payloadTemp);
        } catch (error) {
            console.log(error.response.data);
        }
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
        const payload = {
            new_password: password,
        };
        try {
            await updatePasswordAdmin(rootState.AuthModule.accessToken, id, payload);
        } catch (error) {
            showSnack(`Cannot set password for user ${id}`);
        }

        commit("setIsLoading", false);
    },

    async delete({ commit }, id) {
        commit("setIsLoading", true);
        let check = await removeUser(id);
        if (check === true) {
            commit("deleteUser", id);
            showSnack(`Deleted user id = ${id}`);
        } else {
            showSnack(`Can't deleted user id = ${id}`);
        }

        commit("setIsLoading", false);
    },

    async updateEmail({ commit, rootState }, { id, email }) {
        commit("setIsLoading", true);
        const payload = {
            email,
        };
        try {
            await updateEmailAdmin(rootState.AuthModule.accessToken, id, payload);
        } catch (error) {
            console.log(error);
        }
        commit("setIsLoading", false);
    },

    async setAsBidder({ commit, rootState }, id) {
        commit("setIsLoading", true);

        let payload = {
            user_id: id + "",
            role: "bidder",
        };

        let user = null;

        // call API
        try {
            user = await updateRole(rootState.AuthModule.accessToken, payload);
        } catch (error) {
            console.log(error);
        }

        if (user === undefined || user === null) {
            commit("setIsLoading", false);
            showSnack(`Can't user id = ${id} as bidder`);
            return;
        }

        commit("setUserAsBidder", id);
        commit("setIsLoading", false);
        showSnack(`Set user id = ${id} as bidder`);
    },

    async setAsSeller({ commit, rootState }, id) {
        commit("setIsLoading", true);
        // call API
        let payload = {
            user_id: id + "",
            role: "seller",
        };

        let user = null;

        // call API
        try {
            user = await updateRole(rootState.AuthModule.accessToken, payload);
        } catch (error) {
            console.log(error);
        }

        if (user === undefined || user === null) {
            commit("setIsLoading", false);
            showSnack(`Can't user id = ${id} as bidder`);
            return;
        }

        commit("setUserAdSeller", id);
        commit("setIsLoading", false);
        showSnack(`Set user id = ${id} as seller`);
    },

    async fetchUpgradeRequests({ commit, rootState }) {
        commit("setIsLoading", true);
        const data = [];

        try {
            let requests = await getUpgradeRequests(rootState.AuthModule.accessToken);

            requests?.forEach(async (request) => {
                let user = await getUser(rootState.AuthModule.accessToken, request.user_id);

                let { point } = await getUserWithPoint(request.user_id);

                data.push({
                    userId: request.user_id,
                    full_name: user.full_name,
                    email: user.email,
                    rating: point,
                    time: request.time,
                    reason: request.reason,
                });
            });
        } catch (error) {
            console.log(error);
        }

        commit("setUpgradeRequests", data);
        commit("setIsLoading", false);
    },

    acceptRequest({ commit, dispatch }, id) {
        commit("setIsLoading", false);
        dispatch("setAsSeller", id);
        dispatch("deleteRequest", id);
        commit("removeUpgradeRequest", id);
        commit("setIsLoading", false);
    },

    async rejectRequest({ commit, dispatch }, id) {
        commit("setIsLoading", false);
        dispatch("deleteRequest", id);
        commit("setIsLoading", false);
        showSnack(`Rejected request from user ${id}`);
    },

    async deleteRequest({ commit, rootState }, id) {
        try {
            await deleteUpgradeRequests(rootState.AuthModule.accessToken, id);
            commit("removeUpgradeRequest", id);
        } catch (error) {
            console.log(error);
        }
    },
};
