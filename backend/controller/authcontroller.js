const Joi = require("joi");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const userDTO = require("../dto/user");
const RefreshToken = require("../model/token");
const JWTService = require("../services/JWTService");

const authController = {
  async register(req, res, next) {
    // validate user input
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    });
    const { error } = userRegisterSchema.validate(req.body);

    //2. if error in validation -> return error via middleware
    if (error) {
      return next(error);
    }
    // // 3. if email or user is already registered, return an error
    const { username, name, email, password } = req.body;
    try {
      const emailInUse = await User.exists({ Email: email });

      const usernameInUse = await User.exists({ Username: username });

      if (emailInUse) {
        const error = {
          status: 401,
          message: "Email already exsist",
        };
        return next(error);
      }
      if (usernameInUse) {
        const error = {
          status: 409,
          message: "Username is already taken",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // store user to db
    let accessToken;
    let refreshToken;
    let user;
    try {
      const userToRegister = new User({
        Username: username,
        Name: name,
        Email: email,
        Password: hashedPassword,
      });

      user = await userToRegister.save();


      accessToken = JWTService.signAccessToken({ id: user.id }, "30m");
      refreshToken = JWTService.signRefreshToken({ id: user.id }, "60m");
      console.log("token generation");

      JWTService.storeRefreshToken(refreshToken, user.id);

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      // response send
      const dto = new userDTO(user);
      return res.status(201).json({ user: dto, auth: true });
    } catch (error) {
      return next(error);
    }
  },
  async login(req, res, next) {
    // 1. validate user input
    // 2. if validation error, return error
    // 3. match username and password
    // 4. return response
    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });

    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    let user;

    const { username, password } = req.body;
    console.log(req.body);
    try {
      user = await User.findOne({ Username: username });
      if (!user) {
        const error = {
          status: 401,
          message: "Invalid username!",
        };
        return next(error);
      }
      const matchpass = await bcrypt.compare(password, user.Password);
      if (!matchpass) {
        const error = {
          status: 401,
          message: "Invalid password!",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    const accessToken = JWTService.signAccessToken({ id: user.id }, "30m");
    const refreshToken = JWTService.signRefreshToken({ id: user.id }, "60m");

    //update refresh token in db
    try {
      await RefreshToken.updateOne(
        { _id: user.id },
        { token: refreshToken },
        { upsert: true }
      );
    } catch (error) {
      return next(error);
    }

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    const UserDTO1 = new userDTO(user);
    return res.status(200).json({ user: UserDTO1, auth: true });
  },

  async logout(req, res, next) {
    const { refreshToken } = req.cookies;
    try {
      await RefreshToken.deleteOne({ token: refreshToken });
    } catch (error) {
      return next(error);
    }

    // delete cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    // response
    return res.status(200).json({ user: null, auth: false });
  },

  async refresh(req, res, next){
   
    console.log(req)
      // 1. get refreshToken from cookies
    // 2. verify refreshToken
    // 3. generate new tokens
    // 4. update db, return response
    const origionalRefreshToken = req.cookies.refreshToken;
    let id
    try {
       const decodedToken = JWTService.verifyRefreshToken(origionalRefreshToken)
       id = decodedToken.id
    } catch (e) {
      const error = {
        status: 401,
        message: 'unauthorized'
      }
      return next(error)
    }
    try {
      const match = RefreshToken.findOne({
        _id: id,
        token: origionalRefreshToken,
      });
      if(!match){
        const error = {
          status: 401,
          message: "Unauthorized"
        }
        return next(error)
      }
    } catch (error) {
      return next(error)
    }
    try {
      const accessToken = JWTService.signAccessToken({_id: id}, "30m")
      const refreshToken = JWTService.signRefreshToken({_id: id}, "60m")
      
      await RefreshToken.updateOne({_id: id}, {token:refreshToken});
      
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

    } catch (error) {
      return next(error)
    }
    const user = await User.findOne({_id: id});
    const dto = new userDTO(user)
    return res.status(200).json({user:dto, auth: true})
  }
};

module.exports = authController;
