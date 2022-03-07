const router = require('express').Router();
const customerController = require('../controllers/customer.controller');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware);
router.route("/")
    .get(customerController.getAll)
    .post(customerController.create)

router.route('/:id')
    .get(customerController.getById )
    .put(customerController.update)
    .delete(customerController.remove)

module.exports = router;