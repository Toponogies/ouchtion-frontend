import {
    createUser,
    getAllUser,
    removeUser,
    updateEmailAdmin,
    updatePasswordAdmin,
    updateRole,
    updateUserAdmin,
} from "@/api/user";
import { ROLES } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";

export default {
    async getItems({ commit }) {
        commit("setLoading", true);

        let users = await getAllUser();

        if (users) {
            users = users.map((user) => ({
                id: user.user_id,
                full_name: user.full_name,
                email: user.email,
                address: user.address,
                dob: user.dob,
                is_active: user.is_active,
                role: user.role,
            }));
            commit("setItems", users);
        } else {
            showSnack(`Failed to get user list`);
        }

        commit("setLoading", false);
    },

    async create({ commit }, payload) {
        commit("setLoading", true);

        let result_createUser = await createUser(payload);

        // user created -- now setting password
        if (result_createUser) {
            // extract id and password from previous payloads
            let newId = result_createUser.user_id;
            let password = payload.password;

            // remove password before committing to store
            let payload_commit = {
                ...payload,
                id: newId,
            };
            delete payload_commit.password;
            commit("add", payload_commit);

            // set password
            let result_updatePasswordAdmin = await updatePasswordAdmin(newId, password);
            if (result_updatePasswordAdmin) {
                showSnack(`Created user id = ${newId}`);
            } else {
                showSnack(`Created user id = ${newId}, but failed to set password`);
            }
        } else {
            showSnack(`Failed to create user`);
        }

        // get user id
        commit("setLoading", false);
    },

    async updateInfo({ commit }, payload) {
        commit("setLoading", true);

        let id = payload.id;
        let finalPayload = {
            full_name: payload.full_name,
            address: payload.address,
            dob: payload.dob,
        };
        let result = await updateUserAdmin(id, finalPayload);
        console.log(result);

        if (result) {
            commit("update", payload);
            showSnack(`Updated user id = ${id}`);
        } else {
            showSnack(`Failed to update user id = ${id}`);
        }

        commit("setLoading", false);
    },

    async updateEmail({ commit }, { id, email }) {
        commit("setLoading", true);

        const payload = {
            email,
        };
        let result = await updateEmailAdmin(id, payload);

        if (result) {
            showSnack(`Updated email for user id = ${id}`);
        } else {
            showSnack(`Failed to update email for user id = ${id}`);
        }

        commit("setLoading", false);
    },

    async updatePassword({ commit }, { id, password }) {
        commit("setLoading", true);

        let result = await updatePasswordAdmin(id, password);

        if (result) {
            showSnack(`Password set for user id = ${id}`);
        } else {
            showSnack(`Failed to set password for user ${id}`);
        }

        commit("setLoading", false);
    },

    async delete({ commit }, id) {
        commit("setLoading", true);

        let result = await removeUser(id);

        if (result) {
            commit("remove", id);
            showSnack(`Deleted user id = ${id}`);
        } else {
            showSnack(`Failed to delete user id = ${id}`);
        }

        commit("setLoading", false);
    },

    async setAsBidder({ commit }, id) {
        commit("setLoading", true);

        let result = await updateRole({
            user_id: id + "",
            role: ROLES.BIDDER,
        });

        if (result) {
            commit("setRole", { id, role: ROLES.BIDDER });
            showSnack(`Set user id = ${id} as bidder`);
        } else {
            showSnack(`Failed to set user id = ${id} as bidder`);
        }

        commit("setLoading", false);
    },
};
