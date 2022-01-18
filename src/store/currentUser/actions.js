import axios from "axios";
export default {
    async doGetUser({ commit,rootState, dispatch }) {
        if (rootState.AuthModule.accessToken === null)
            return
        let user = await axios.get("http://localhost:3000/api/users",{headers: {
            'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
        }}
        ).then((response) => {
            return response.data;
        })
        .catch( async (error) => {
            console.log(error.response.data);
            if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN")
            {
                await dispatch('AuthModule/doRefresh', null, { root: true });
            }
            return await axios.get("http://localhost:3000/api/users",{headers: {
                'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
            }}).then((response) => {
                return response.data;
            })
            .catch((error) => {
               console.log(error.response.data)
               return null;
            });
        });
        commit("updateUser", user);
    },
    logOutUser({ commit }){
        commit("updateUser", null);
    }
};
