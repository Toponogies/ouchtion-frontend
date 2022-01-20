export default {
    updateUser(state, user) {
        state.id = user.user_id;
        state.username = user.full_name;
        state.email = user.email;
        state.dob = user.dob;
        state.address = user.address;
        state.rating = user.point;
        state.role = user.role;
    },
    clearUser(state) {
        state.id = null;
        state.username = null;
        state.email = null;
        state.dob = null;
        state.address = null;
        state.rating = null;
        state.role = null;
    },
};
