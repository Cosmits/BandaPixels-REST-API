import tokenService from "../services/tokenService.js";

export function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw next(new Error(`Error authorization with token. Empty authorizationHeader`));
        }

        const arr = authorizationHeader.split(" ");
        const accessToken = arr[1];
        if (!accessToken) {
            throw next(new Error(`Error authorization with token. Empty token `));
        }

        const userData = tokenService.verifyToken(accessToken);
        if (!userData) {
            throw next(new Error(`Error authorization with token. Bad token`));
        }
        req.user = userData;
        next();
    } catch (e) {
        return next(new Error(`Error authorization with token. Other token error`));
    }
}
