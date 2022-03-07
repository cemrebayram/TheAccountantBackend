const router = require('express').Router();
const userContoller = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
router.post("/update", authMiddleware ,userContoller.update);
router.get('/:username', userContoller.getUser); 

module.exports = router;