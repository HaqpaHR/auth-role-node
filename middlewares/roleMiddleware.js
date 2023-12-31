const jwt = require('jsonwebtoken');
const {secret} = require('../config')

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" });
      }
      const {roles: userRoles} = jwt.verify(token, secret);
      let hashRole = false;
      userRoles.forEach(role => {
          if (roles.includes(role)) {
              hashRole = true;
          }
      })
        if (!hashRole) {
            return res.status(403).json({ message: "Этому пользователю доступ отказан" });
        }
        next()
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
  };
};
