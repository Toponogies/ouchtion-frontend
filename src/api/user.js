import axios from "axios";

export async function getUserWithPoint(user_id){
    return await axios
    .get(`http://localhost:3000/api/users/${user_id}/point`)
    .then((response) => {
        return response.data;
    })
}