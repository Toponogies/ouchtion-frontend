import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";
import { showSnack } from "@/utils/showSnack";
import { today, toTimestamp } from "@/utils/timeUtils";

export default {
    async addProduct({ rootState }, {
        name,
        images,
        category_id,
        init_price,
        endDate,
        endTime,
        step_price,
        buy_price,
        is_extendable,
        description,
    }) {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("category_id", category_id);
        formData.append("end_at", toTimestamp(endDate,endTime));
        formData.append("init_price", init_price+"");
        formData.append("step_price", step_price+"");
        if (buy_price !== undefined)
        {
            formData.append("buy_price", buy_price+"");
        }
        formData.append("is_extendable", is_extendable ? 1 : 0);
        formData.append("avatar", images[0]);

        console.log({
            name,
            images,
            category_id,
            init_price,
            endDate,
            endTime,
            step_price,
            buy_price,
            is_extendable,
            description,
        });

        // add product
        let product = null;
        try{
            product = await axios.post(`${API_ENDPOINTS.PRODUCTS}`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + rootState.AuthModule.accessToken,
                }})
                .then((res) => {
                    return res.data;
                })
        }catch(error){
            console.log(error.response);
            showSnack("Can't add product")
            return;
        }

        // update description
        try{
            await axios.post(`${API_ENDPOINTS.PRODUCTS}/${product.product_id}/descriptions`, {
                description:description,
            }, {
                headers: {
                  Authorization: "Bearer " + rootState.AuthModule.accessToken,
                }})
                .then((res) => {
                    return res.data;
                })
        }catch(error){
            console.log(error);
            showSnack("Can't add product description")
            return;
        }

        // add images
        images.forEach(async image => {
            let formDataImage = new FormData();
            formDataImage.append("image", image);
            await axios.post(`${API_ENDPOINTS.PRODUCTS}/${product.product_id}/images`, formDataImage, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + rootState.AuthModule.accessToken,
                }})
                .then((res) => {
                    return res.data;
                })
        });

        showSnack("Create success");
        return;
    },
};
