import axios from "axios";
import Module from "module";



class HTTPService{
  baseUrl: string;
  fetchingService: object;
  apiVersion: string;
  constructor(baseUrl:string = "http://localhost:5000/",fetchingService = axios, apiVersion = 'api') {
    this.baseUrl = baseUrl
    this.fetchingService = axios
    this.apiVersion = apiVersion
  }
  get(){
  return this.baseUrl
 }
}