import axios from "axios";
export default {
    someOtherAction ({dispatch}) {
        dispatch('doRefresh');
    },
    async doGetUser({ commit,rootState }) {
        let user = await axios.get("http://localhost:3000/api/users",{headers: {
            'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
        }}
        ).then((response) => {
            return response.data;
        })
        .catch( async (error) => {
            console.log(error);
            if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN")
            {
                this.doRefresh()
            }
            return await axios.get("http://localhost:3000/api/users",{headers: {
                'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
            }}).then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error)
               return null;
            });
        });
        commit("updateUser", user);
    },
    logOutUser({ commit }){
        commit("updateUser", null);
    }
};
