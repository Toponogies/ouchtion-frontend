import axios from "axios";

export default {
    async fetchAll({ commit }) {
        try{
            const categories = await axios.get("http://localhost:3000/api/categorys").then((response) => {
                return response.data;
            })
            commit("updateCategories", categories);
        }
        catch(error){
            console.log(error.response.data);
        }
    },
};
