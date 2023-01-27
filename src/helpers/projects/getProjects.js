import axios from "axios";

export function requestGetProject() {
    return axios.get("http://localhost:3000/api/projects");
}
export function requestPostProject(form_data) {
    return axios.post("http://localhost:3000/api/projects", form_data, {
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}
export function requestUpdateProject(form_data, id, uid) {
    return axios.put(`http://localhost:3000/api/projects/${id}`, form_data, {
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}
export function requestDeleteProject(id) {
    return axios.delete(`http://localhost:3000/api/projects/${id}}`)

}



