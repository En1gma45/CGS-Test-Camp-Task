import Payload from "Payload";
import jwt from "jsonwebtoken";

function extractId(token: string) {

    const payload: Payload | any = jwt.verify(token, 'jwtSecretToken');
    return payload.userId;
}

export default extractId;