import jwt from 'jsonwebtoken'
import config from '../config/config'
import { IUser } from '../models/User'


const signJWT = (userId: string, callback: (error: Error | null, token: string | null) => void): void => {
    const time = new Date().getTime()
    const expirationTime = time + Number(config.server.token.expireTime) * 100000
    const expTimeInSec = Math.floor(expirationTime/1000)

    try {
        jwt.sign({
            user: userId
        },
        config.server.token.secret,
        {
            issuer: config.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: expTimeInSec
        },
        (error, token) => {
            if(error){
                callback(error, null)
            }
            else if(token){
                callback(null, token)
            }
        })
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

export default signJWT