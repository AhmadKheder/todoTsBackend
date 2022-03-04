const router = require('express').Router();
import { deleteUser, fieldsVadlidating, getUsers, login, resigter } from '../controllers/users/userController';
import UserAuthrization from '../middlewares/userAuthmiddleware';

router.get("/users", UserAuthrization, getUsers)
router.post("/register", fieldsVadlidating, resigter)
router.post("/login", login)

router.delete("/delete-user/:id", deleteUser)


module.exports = router;