const router = require('express').Router();
const todoController = require('../controllers/todo.controller');
const authMiddleware = require('../middlewares/auth.middleware');
router.use(authMiddleware);
router.route("/")
    .get(todoController.getAll)
    .post(todoController.create)

router.route('/:id')
    .put(todoController.update)
    .delete(todoController.remove)

module.exports = router;