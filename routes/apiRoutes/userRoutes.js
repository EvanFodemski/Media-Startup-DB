const router = require('express').Router();

const {
    findUsers,
    getOneUser,
    createUser,
    removeUser,
    updateUser,
    addFriend,
    removeFriend,
} = require ('../../controllers/usersController');

router.route('/').get(findUsers).post(createUser);

router.route('/:userId')
.get(getOneUser)
.put(updateUser)
.delete(removeUser);


router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;
