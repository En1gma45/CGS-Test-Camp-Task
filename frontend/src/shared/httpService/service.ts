import axios, { AxiosInstance } from "axios";



export class HTTPService{
  baseUrl: string;
  fetchingService: AxiosInstance;
  apiVersion: string;
  constructor(baseUrl:string = "http://localhost:5000",fetchingService = axios, apiVersion = 'api') {
    this.baseUrl = baseUrl
    this.fetchingService = axios
    this.apiVersion = apiVersion
  }
  private getFullUrl(endpoint?:string) {
    return `${this.baseUrl}/${this.apiVersion}/${endpoint}`
  } 
  get(){
  return this.fetchingService.get(this.getFullUrl())
  }
  put(endpoint:string,data:object) {
    return this.fetchingService.post(this.getFullUrl(endpoint),data)
  }
  delete(endpoint:string) {
    return this.fetchingService.delete(this.getFullUrl(endpoint))
  }
}


export default new HTTPService()