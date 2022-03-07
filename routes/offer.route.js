const router = require('express').Router();
const offerController = require('../controllers/offer.controller');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware);
router.route("/")
    .get(offerController.getAll)
    .post(offerController.create)

router.route('/pdf/:id').get(offerController.pdf);

router.route('/:id')
    .get(offerController.getById)


module.exports = router;