import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import TokenService from "./tokenService.js";
import UserDTO from "../models/userDTO.js";

class UserService {

    async signup (login, password) {
        const tempUser = await UserModel.findOne({id:login}).exec();
        if (tempUser) {
            throw new Error(`User ${login} already registered`);
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const login_type = "phone or email" // need
        const token = TokenService.getNewToken({login, hashPassword});

        const new_user = await UserModel.create({
            id: login,
            id_type: login_type,
            password: hashPassword,
            token: token,
        })
        await new_user.save()

        return {new_user};
    }

    // async signin (email, password) {
    //     const tempUser = await UserModel.findOne({email}).exec();
    //     if (!tempUser) {
    //         throw new Error(`Error user ${email} not found`);
    //     }
    //     const truePass = await bcrypt.compare(password, tempUser.password);
    //     if (!truePass) {
    //         throw new Error(`Error password in user ${email}`);
    //     }
    //     const userDTO = new UserDTO(tempUser);
    //     const twoTokens = TokenService.getNewToken({...userDTO});
    //     await TokenService.saveTokenInDB(userDTO.id, twoTokens.refreshToken);
    //
    //     return {...twoTokens, user: userDTO};
    // }
    //
    // async logout(all) {
    //     return TokenService.delTokenInDB(refreshToken);
    // }
    //
    // async refresh(refreshToken) {
    //     if (!refreshToken) {
    //         throw new Error(`Error authorization with refreshToken`);
    //     }
    //     const userData = TokenService.verifyRefreshToken(refreshToken);
    //     const token = await TokenService.findTokenInDB(refreshToken);
    //     if (!userData || !token) {
    //         throw new Error(`Error authorization with refreshToken`);
    //     }
    //     const tempUser = await UserModel.findOne({email: userData.email}).exec();
    //     if (!tempUser) {
    //         throw new Error(`Error user ${userData.email} not found`);
    //     }
    //     const userDTO = new UserDTO(tempUser);
    //     const twoTokens = TokenService.getNewToken({...userDTO});
    //     await TokenService.saveTokenInDB(userDTO.id, twoTokens.refreshToken);
    //
    //     return {...twoTokens, user: userDTO};
    // }
    //
    // async getAllUsers() {
    //     return UserModel.find().exec();
    // }
}

export default new UserService();
