import axios from "axios";

const instance = axios.create({
    headers: { Authorization: "Bearer " + "token" } // 设置请求头
})

instance.interceptors.request.use(
    (config) => {
        config.data = JSON.stringify(config.data);
        config.headers = {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const upload_instance = axios.create({
    headers: { Authorization: "Bearer " + "token" } // 设置请求头
})

upload_instance.interceptors.request.use(
    (config) => {
        config.headers = {
            "Content-Type": "multipart/form-data",
            "Authorization": localStorage.getItem("token"),
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export function get(url, params = {}, doSuccess, doFailure) {
    instance.get(url, {
        params: params,
    }).then((response) => {
        doSuccess(response.data);
    }).catch((error) => {
        doFailure(error);
    });
}

export function post(url, data, doSuccess, doFailure) {
    instance.post(url, data).then(
        (response) => {
            doSuccess(response.data);
        },
        (err) => {
            doFailure(err);
        }
    );
}

export function upload_post(url, data, doSuccess, doFailure) {
    upload_instance.post(url, data).then(
        (response) => {
            doSuccess(response.data);
        },
        (err) => {
            doFailure(err);
        }
    );
}
