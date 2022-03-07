const router = require('express').Router();
const invoiceController = require('../controllers/invoice.controller');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware);
router.route("/")
    .get(invoiceController.getAll)
    .post(invoiceController.create)

router.route('/pdf/:id').get(invoiceController.pdf);

router.route('/:id')
    .get(invoiceController.getById)


module.exports = router;