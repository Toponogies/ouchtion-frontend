import { addProductData, addProductImageData } from "@/api/product";
import { appendDescription } from "@/api/productDescription";
import { showSnack } from "@/utils/showSnack";
import { toTimestamp } from "@/utils/timeUtils";

export default {
    async addProduct(
        { commit },
        { name, images, category_id, init_price, endDate, endTime, step_price, buy_price, is_extendable, description }
    ) {
        commit("clearAll");

        let formData = new FormData();
        formData.append("name", name);
        formData.append("category_id", category_id);
        formData.append("end_at", toTimestamp(endDate, endTime));
        formData.append("init_price", init_price + "");
        formData.append("step_price", step_price + "");
        if (buy_price !== undefined) {
            formData.append("buy_price", buy_price + "");
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
        try {
            product = await addProductData(formData);
        } catch (error) {
            console.log(error.response);
            showSnack("Failed to add product");
            return;
        }

        // update description
        try {
            await appendDescription(product.product_id, description);
        } catch (error) {
            console.log(error);
            showSnack("Failed to add product description");
            return;
        }

        // add images
        images.forEach(async (image) => {
            let formDataImage = new FormData();
            formDataImage.append("image", image);
            await addProductImageData(product.product_id, formDataImage);
        });

        // redirect to product detail page
        if (product) {
            commit("setNewProductId", product.product_id);
        }
        showSnack("Create success");
        return;
    },
};
