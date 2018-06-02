import 'isomorphic-fetch'

const restClient = {};

const resolveResponse = (response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(json => {
            if (response.status >= 400) {
                return Promise.reject(json);
            } else {
                return Promise.resolve(json);
            }
        });
    }
    return response.text().then(text => {
        if (response.status >= 400) {
            return Promise.reject(text);
        } else {
            return Promise.resolve(text);
        }
    });

};

restClient.get = (url) => {
    return fetch(url)
        .then(response => {
            return resolveResponse(response);
        });
};

restClient.post = (url, headers, body) => {
    return fetch(url, {
        method: 'post',
        headers: headers,
        body: JSON.stringify(body)
    }).then(response => {
        return resolveResponse(response);
    });
};

export default restClient