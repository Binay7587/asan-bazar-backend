const router = require('express').Router()
const userCtrl = require("../app/controllers/user.controllers");


router.route("/")
    .get(userCtrl.listUsers)
    .post(userCtrl.createUser)

router.route('/:id')
    .get(userCtrl.getUserDetail)
    .put(userCtrl.updateUser)
    .delete(userCtrl.deleteUser)


module.exports = router;