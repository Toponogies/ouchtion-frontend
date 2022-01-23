import { deleteUpgradeRequests, getUpgradeRequests } from "@/api/upgradeRequest";
import { getUser, getUserWithPoint, updateRole } from "@/api/user";
import { ROLES } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";

export default {
    async getItems({ commit }) {
        commit("setLoading", true);

        let requests = await getUpgradeRequests();

        if (requests) {
            requests = requests.map(async (request) => {
                let user = await getUser(request.user_id);
                let { point } = await getUserWithPoint(request.user_id);

                return {
                    userId: request.user_id,
                    full_name: user.full_name,
                    email: user.email,
                    rating: point,
                    time: request.time,
                    reason: request.reason,
                };
            });
            commit("setItems", requests);
        } else {
            showSnack(`Failed to get upgrade requests`);
        }

        commit("setLoading", false);
    },

    async accept({ commit }, id) {
        commit("setLoading", false);

        let result_updateRole = await updateRole({
            user_id: id,
            role: ROLES.SELLER,
        });
        let result_deleteRequest = await deleteUpgradeRequests(id);

        if (result_updateRole && result_deleteRequest) {
            commit("remove", id);
            commit("AdminUsersDashboardModule/remove", id, { root: true });
            showSnack(`Accepted request from user id = ${id}`);
        } else if (!result_updateRole) {
            showSnack(`Failed to set role for user id = ${id}`);
        } else if (!result_deleteRequest) {
            showSnack(`Failed to remove request for user id = ${id}`);
        }

        commit("setLoading", false);
    },

    async reject({ commit }, id) {
        commit("setLoading", false);

        let result = await deleteUpgradeRequests(id);

        if (result) {
            commit("remove", id);
            showSnack(`Rejected request from user id = ${id}`);
        } else {
            showSnack(`Failed to reject request from user id = ${id}`);
        }

        commit("setLoading", false);
    },
};
