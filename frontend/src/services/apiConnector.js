import axios from "axios";

const apiInstance = axios.create();

const apiConnector = function (method, url, body, header, params) {
    return apiInstance({
        url,
        method,
        data: body ? body : null,
        headers: header ? header : null,
        params: params ? params : null,
    })
}

export default apiConnector;