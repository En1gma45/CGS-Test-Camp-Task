import axios from 'axios';

class BaseProvider {

    post(baseUrl: string, resource: string, body: object) {
        return axios.post(baseUrl + resource, body).then(res => BaseProvider.processResult(res))
    }

    put(baseUrl: string, resource: string, id: string, body: object,) {
        return axios.put(baseUrl + resource + id, body).then(res => BaseProvider.processResult(res))
    }

    private static processResult(res: any) {
        if (res.status === 200) {
            return res.data.todo;
        } else if (res.status >= 400 && res.status < 500) {
            console.log("BAD_REQUEST");
            return {error: "Bad request"};
        } else if (res.status >= 500) {
            console.log("SERVER ERROR");
            return {error: "Server error"};
        } else {
            console.log("STATUS IS: " + res.status);
            return {error: "Unknown", status: res.status};
        }
    }

}

export default BaseProvider;
