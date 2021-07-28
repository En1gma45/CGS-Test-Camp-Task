import axios, {AxiosInstance} from 'axios'


class APIServices {

    baseUrl: string
    fetchingService: AxiosInstance
    apiVersion: string

    constructor(baseUrl = 'http://192.168.0.108:5000', fetchingService = axios, apiVersion='api'){
        this.baseUrl = baseUrl;
        this.fetchingService = fetchingService;
        this.apiVersion = apiVersion
    }

    private getFullApiUrl(endpoint?: string) {
        return `${this.baseUrl}/${this.apiVersion}${endpoint}`
    }

    get(endpoint: string){
        return this.fetchingService.get(this.getFullApiUrl(endpoint))
    }

    post(endpoint: string, data: object){
        return this.fetchingService.post(this.getFullApiUrl(endpoint), data)
    }

    update(endpoint: string, data: object) {
        return this.fetchingService.put(this.getFullApiUrl(endpoint), data)
    }
    
    delete(endpoint: string) {
        return this.fetchingService.delete(this.getFullApiUrl(endpoint))
    }

}

export default new APIServices()
