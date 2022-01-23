import { findIndex } from "lodash-es";

export default {
    setLoading(state, loading) {
        state.isLoading = loading;
    },

    setItems(state, users) {
        state.items = users;
    },

    add(state, payload) {
        state.items.push(payload);
    },

    update(state, payload) {
        // chưa update được
        const targetIndex = findIndex(state.items, { id: payload.id });
        const targetItem = {
            ...state.items[targetIndex],
            full_name: payload.full_name,
            address: payload.address,
            dob: payload.dob,
        };
        state.items.splice(targetIndex, 1, targetItem);
    },

    remove(state, id) {
        const targetIndex = findIndex(state.items, { id });
        state.items.splice(targetIndex, 1);
    },

    setRole(state, id, role) {
        const targetIndex = findIndex(state.items, { id });
        const targetItem = {
            ...state.items[targetIndex],
            role,
        };
        state.items.splice(targetIndex, 1, targetItem);
    },

    // eslint-disable-next-line no-unused-vars
    clearAll(state) {
        state = {
            ...state,
            isLoading: false,
            users: [],
        };
    },
};
