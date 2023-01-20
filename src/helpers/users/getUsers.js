import axios from "axios";
import { auth } from "../../firebase";

import { onAuthStateChanged } from "firebase/auth";
import { eventChannel } from 'redux-saga';

export function requestGetUser() {
    return axios.get("http://localhost:3000/api/users");
}
export function requestPostUser(form_data) {
    return axios.post("http://localhost:3000/api/users", form_data, {
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}
export function requestUpdateUser(form_data, id) {
    return axios.put(`http://localhost:3000/api/users/${id}`, form_data, {
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}
export function requestDeleteUser(id) {
    return axios.delete(`http://localhost:3000/api/users/${id}`)

}


export async function urlToObject(image) {
    const response = await fetch(image);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });
    return file

}


// export function requestAdmin(id) {
//     return axios.get(`http://34.79.75.175/webApprouter/Admin/${id}`);
// }
// export function requestUser(id) {
//     return axios.get(`http://34.79.75.175/webApprouter/dispatcher/${id}`);
// }
// export const getCurrentUser = () => {
//     return new Promise((resolve, reject) => {
//         const unsubscribe = onAuthStateChanged(
//             auth,
//             (userAuth) => {
//                 unsubscribe();
//                 resolve(userAuth);
//             },
//             reject
//         )
//     })
// }