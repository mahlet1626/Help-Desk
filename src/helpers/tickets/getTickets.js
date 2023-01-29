import axios from "axios";

export function requestGetTicket() {
    return axios.get("http://localhost:3000/api/tickets");
}
export function requestPostTicket(form_data) {
    return axios.post("http://localhost:3000/api/tickets", form_data, {
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}
export function requestUpdateTicket(form_data, id) {
    return axios.put(`http://localhost:3000/api/tickets/${id}`, form_data, {
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}
export function requestDeleteTicket(id) {
    return axios.delete(`http://localhost:3000/api/tickets/${id}`)

}



