export default {
    updateUser: (state, user) => {
        if (user !== null)
        {
            state.id = user.user_id;
            state.username = user.full_name;
            state.role = user.role;
            state.rating = user.point;
        }
        else{
            state.id = null;
            state.username = null;
            state.role = null;
            state.rating = 0.0;
        }
    },
};
