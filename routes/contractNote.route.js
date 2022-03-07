const router = require('express').Router();
const contractNoteController = require('../controllers/contractNote.controller');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware);
router.route("/")
    .get(contractNoteController.getAll)
    .post(contractNoteController.create)

router.route('/pdf/:id').get(contractNoteController.pdf);

router.route('/:id')
    .get(contractNoteController.getById)


module.exports = router;