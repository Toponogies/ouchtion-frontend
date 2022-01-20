import { showSnack } from "@/utils/showSnack";

export default {
    fetchAll({ commit }) {
        commit("setIsLoading", true);
        // call API
        const users = [
            {
                id: 1,
                full_name: "AB Nguyen",
                email: "ab.nguyen@ouchtion.app",
                address: "1 Road, City",
                dob: "2000-01-01T00:00:00.000Z",
                is_active: 1,
                role: "seller",
            },
            {
                id: 2,
                full_name: "AB Nguyen",
                email: "ab.nguyen@ouchtion.app",
                address: "1 Road, City",
                dob: "2000-01-01T00:00:00.000Z",
                is_active: 1,
                role: "bidder",
            },
            {
                id: 3,
                full_name: "AB Nguyen",
                email: "ab.nguyen@ouchtion.app",
                address: "1 Road, City",
                dob: "2000-01-01T00:00:00.000Z",
                is_active: 1,
                role: "bidder",
            },
        ];
        commit("setUsers", users);
        commit("setIsLoading", false);
    },

    create({ commit, dispatch }, payload) {
        commit("setIsLoading", true);
        // call API
        // get user id
        const newId = 9999;
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

    update({ commit }, payload) {
        commit("setIsLoading", true);
        // call API
        commit("updateUser", payload);
        commit("setIsLoading", false);
        showSnack(`Updated user id = ${payload.id}`);
    },

    // updatePassword({ commit }, { id, password }) {
    //     // call API to set password separately -- store does not save password
    // },

    delete({ commit }, id) {
        commit("setIsLoading", true);
        // call API
        commit("deleteUser", id);
        commit("setIsLoading", false);
        showSnack(`Deleted user id = ${id}`);
    },

    setAsBidder({ commit }, id) {
        commit("setIsLoading", true);
        // call API
        commit("setUserAsBidder", id);
        commit("setIsLoading", false);
        showSnack(`Set user id = ${id} as bidder`);
    },

    setAsSeller({ commit }, id) {
        commit("setIsLoading", true);
        // call API
        commit("setUserAdSeller", id);
        commit("setIsLoading", false);
        showSnack(`Set user id = ${id} as seller`);
    },

    fetchUpgradeRequests({ commit }) {
        commit("setIsLoading", true);
        setTimeout(() => {
            const requests = [
                {
                    userId: 1,
                    full_name: "Dummy user 01",
                    email: "dummy.alpha@ouchtion.app",
                    rating: 8.0,
                    time: "2022-01-19T18:30:17.434Z",
                    reason: "I want to sell 99% pure weed 🍁 kthxbye",
                },
                {
                    userId: 2,
                    full_name: "Dummy user 02",
                    email: "dummy.bravo@ouchtion.app",
                    rating: 6.5,
                    time: "2022-01-19T18:30:17.434Z",
                    reason: "I want to sell 100% more weed than whoever the hell is planning to sell 'em 🍁 kthxbai",
                },
            ];
            commit("setUpgradeRequests", requests);
            commit("setIsLoading", false);
        }, 500);
    },

    acceptRequest({ commit, dispatch }, id) {
        commit("setIsLoading", false);
        setTimeout(() => {
            dispatch("setAsSeller", id);
            commit("removeUpgradeRequest", id);
            commit("setIsLoading", false);
        }, 250);
    },

    rejectRequest({ commit }, id) {
        commit("setIsLoading", false);
        setTimeout(() => {
            commit("removeUpgradeRequest", id);
            commit("setIsLoading", false);
            showSnack(`Rejected request from user ${id}`);
        }, 250);
    },
};
