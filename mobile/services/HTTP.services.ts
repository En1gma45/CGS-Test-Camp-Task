import axios, { AxiosInstance } from "axios";

class APIServices {

    baseUrl: string;
    fetchingService: AxiosInstance;
    apiVersion: string;

    constructor(baseUrl = "http://192.168.0.108:5000", fetchingService = axios, apiVersion= "api") {
        this.baseUrl = baseUrl;
        this.fetchingService = fetchingService;
        this.apiVersion = apiVersion;
    }

    private getFullApiUrl(endpoint?: string) {
        return `${this.baseUrl}/${this.apiVersion}${endpoint}`;
    }

    get(endpoint: string, token?: string) {
        return this.fetchingService.get(`${this.getFullApiUrl(endpoint)}`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
    }

    post(endpoint: string, data: object, token?: string) {
        return this.fetchingService.post(this.getFullApiUrl(endpoint), data, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
    }

    update(endpoint: string, data: object, token?: string) {
        return this.fetchingService.put(this.getFullApiUrl(endpoint), data, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
    }

    delete(endpoint: string, token: string) {
        return this.fetchingService.delete(this.getFullApiUrl(endpoint), {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
    }

}

export default new APIServices();
