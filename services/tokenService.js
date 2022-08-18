import jwt from "jsonwebtoken";

class TokenService {

    getNewToken(data) {
        const token = jwt.sign(
            data,
            process.env.SERVER_ACCESS_TOKEN,
            {
                expiresIn: process.env.EXPIRESIN_TOKEN
                }
            )

        return token
    }

    verifyToken(token) {
        try {
            const userData = jwt.verify(
                token,
                process.env.SERVER_ACCESS_TOKEN
            );
            return userData;
        } catch (e) {
            return null;
        }
    }

    // async delTokenInDB(refreshToken) {
    //     return TokenModel.deleteOne({refreshToken}).exec();
    // }
    //
    // async findTokenInDB(refreshToken) {
    //     return TokenModel.findOne({refreshToken}).exec();
    // }
}

export default new TokenService();
