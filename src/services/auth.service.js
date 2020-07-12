const { ErrorHelper, GenerateTokenHelper } = require("../helpers");
let _userService = null;

class AuthService {

    constructor({ UserService }) {
        _userService = UserService;
    }

    async signUp(user) {
        const { username } = user;
        const userExist = await _userService.getUserByUsername(username);

        if (userExist)
            ErrorHelper(401, "Username already exists");
            
        return await _userService.create(user);
    }

    async signIn(user) { 
        const { username, password } = user;
        const userExist = await _userService.getUserByUsername(username);
        if (!userExist)
            ErrorHelper(404, "User does not exist");
        const validPassword = userExist.comparePasswords(password);
        if (!validPassword)
            ErrorHelper(400, "Invalid Password");
        const userToEncode = {
            username: userExist.username,
            id: userExist._id,
        };
        const token = GenerateTokenHelper(userToEncode);
        return { token, userExist };
    }

}

module.exports = AuthService;