import jwt from "jsonwebtoken";
import { NextFunction, Response } from 'express';
import Request from "../types/Request";
import HttpStatusCodes from 'http-status-codes';
import config from "../config/config";


interface DataStoredInToken {
    user: string
    iat: number
    exp: number
    iss: string
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1]
        if(!token){
            return res
                .status(HttpStatusCodes.UNAUTHORIZED)
                .json({ msg: 'Login before continue' });
        }
        jwt.verify(token, config.server.token.secret, (error, decoded: DataStoredInToken) => {
            if(error){
                return res.status(HttpStatusCodes.UNAUTHORIZED).json({
                    message: 'Token is invalid'
                })
            }
            res.locals.userId = decoded.user
            next()
        })
    }


export default verifyToken
