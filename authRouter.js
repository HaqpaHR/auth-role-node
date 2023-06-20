const Router = require("express");
const router = new Router();
const authController = require("./authControl");
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');
const { check } = require("express-validator");

router.post(
  "/registration",
  [
    check("username", "Имя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть не меньше 4ч и не больше 10 символов"
    ).isLength({ min: 3 }),
  ],
  authController.registration
);
router.post("/login", authController.login);
router.get("/users", roleMiddleware(['ADMIN']), authController.getUsers);

module.exports = router;
