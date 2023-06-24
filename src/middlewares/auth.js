const { verifySign, closeSesion } = require('../utils/jwt');
const user = require('../api/models/user.model');

const isAuth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }
        console.log(authorization);
        const token = authorization.split('')[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: 'No  me has enviado el token' });
        }
        let tokenVerified = verifySign(token);

        if (!tokenVerified.id) {
            return res.status(401).json(tokenVerified);
        }
        console.log(tokenVerified);
        const userLogged = await User.findById(tokenVerified.id);
        req.user = userLogged;
        next();
    } catch (error) {
        return res.status(500).json(error);
    }

    //     next();
    // } catch (error) {
    //     return res.status(500).json(error);
    // }
};

module.exports = { isAuth };
