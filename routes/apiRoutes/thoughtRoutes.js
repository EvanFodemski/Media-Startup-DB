const router = require ('express').Router();

const {
    pullallThoughts,
    pulloneThought,
    createThought,
    editThought,
    deleteThought,
    newReaction,
    deleteReaction,
} = require ('../../controllers/thoughtsController')

router.route('/').get(pullallThoughts).post(createThought);

router.route('/:thoughtId')
.get(pulloneThought)
.put(editThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions')
.post(newReaction);


router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;