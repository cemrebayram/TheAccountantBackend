const router = require('express').Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware);
router.route("/")
    .get(productController.getAll)
    .post(productController.create)

router.route('/:id')
    .get(productController.getById )
    .put(productController.update)
    .delete(productController.remove)

module.exports = router;