import axios from 'axios'


class APIServices {
    getData(url: string){
        return axios.get(`http://192.168.0.108:5000/api${url}`)
    }

    postData(url: string, data: any){
        return axios.post(`http://192.168.0.108:5000/api${url}`, data)
    }

    deleteData(url: string){
        return axios.delete(`http://192.168.0.108:5000/api${url}`)
    }

    updateData(url: string, data: any){
        return axios.put(`http://192.168.0.108:5000/api${url}`, data)
    }
}

export default new APIServices()