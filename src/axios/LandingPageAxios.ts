import axios from "axios";

const landingPageAxios = axios.create({
    // baseURL: ,
    timeout: 60000,

    validateStatus: (status) => {
        return status == 201 || status == 202 || status == 302 || status == 200;
    },
});

landingPageAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        if (status === 408 || error.code === "ECONNABORTED") {
            console.log(`A timeout happend on url ${error.config.url}`);
            return Promise.reject(error);
        } else {
            return Promise.reject(error);
        }
    }
);

export default landingPageAxios;