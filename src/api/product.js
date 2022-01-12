import axios from "axios";

export async function getProduct(product_id){
    return await axios
    .get(`http://localhost:3000/api/products/${product_id}`)
    .then((response) => {
        return response.data;
    })
}

export async function getProductDescription(product_id){
    return await axios
    .get(`http://localhost:3000/api/products/${product_id}/description`)
    .then((response) => {
        return response.data;
    })
}

export async function getProductImage(product_id){
    return await axios
    .get(`http://localhost:3000/api/products/${product_id}/image`)
    .then((response) => {
        return response.data;
    })
}

export async function getProductBidding(product_id){
    return await axios
    .get(`http://localhost:3000/api/products/${product_id}/bidding`)
    .then((response) => {
        return response.data;
    })
}