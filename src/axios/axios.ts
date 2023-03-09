// import axios from "axios";
//
//  axios.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('token'); // get token from local storage
//         debugger
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`; // set token to authorization header
//         }
//         return config;
//     },
//     error => Promise.reject(error)
// );
//
// axios.interceptors.response.use(
//     response => {
//         const token = response.data?.token; // get token from response headers
//         debugger
//         if (token) {
//             localStorage.setItem('token', token); // store token in local storage
//         }
//         return response;
//     },
//     error => Promise.reject(error)
// );

import axios from "axios";

const shopAxios = axios.create({
    // baseURL: ,
    timeout: 60000,
    headers: {
        "Access-Control-Allow-Credentials" : true,
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    validateStatus: (status) => {
        return status == 201 || status == 202 || status == 302 || status == 200;
    },
});

shopAxios.interceptors.response.use(

    (response) => response,
    (error) => {
        const status = error.response?.status;
        if (status === 401) {
            localStorage.clear();
            // logout()
            window.location.href = "/login";
        } else if (status === 408 || error.code === "ECONNABORTED") {
            console.log(`A timeout happend on url ${error.config.url}`);
            return Promise.reject(error);
        } else if(error.code === "ERR_BAD_REQUEST") {
            console.log(error)
            return Promise.reject(error.response?.data)
        } else {
            return Promise.reject(error);
        }
    },

);

export default shopAxios;