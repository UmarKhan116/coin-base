const jwt = require('jsonwebtoken');
const RefreshToken = require('../model/token')
const {ACCESS_TOKEN, REFRESH_TOKEN} = require('../config/index');
// const ACCESS_TOKEN = '46980174e897c4807749082b35f9a2c798ed8646c2c13f377064c5884f64051d5b2b6db5882395007ee828022e4526c414660bd2fbf3974ff1f4f8bcddbe0c5c'
// const REFRESH_TOKEN = '0850bd2e3e08c9208adf5b3d2554bd564f875d84c1f3f8ff2b04ebb46f141ee9bd95264c88a981566a9e3221516c435621ba7881eea69997cfacae4e96a877ea'
class JWTService{
    // sign access token
    static signAccessToken(payload, expiryTime){
        return jwt.sign(payload, ACCESS_TOKEN, {expiresIn: expiryTime});
    }

    // sign refresh token
    static signRefreshToken(payload, expiryTime){
        return jwt.sign(payload, REFRESH_TOKEN, {expiresIn: expiryTime});
    }

    // verify access token
    static verifyAccessToken(token){
        return jwt.verify(token, ACCESS_TOKEN);
    }

    // verify refresh token
    static verifyRefreshToken(token){
        return jwt.verify(token, REFRESH_TOKEN)
    }

    // store refresh token
    static async storeRefreshToken(token, userId){
        try{
            const newToken = new RefreshToken({
                token: token,
                userId: userId
            });

            // store in db
            await newToken.save();
        }
        catch(error){
            console.log(error);
        }
    }
}

module.exports = JWTService;