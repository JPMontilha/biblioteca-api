const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/cadastrar', userController.registerUser);
router.post('/login', userController.authUser);
router.post('/admin', protect, userController.createAdmin);
router.put('/perfil/:id', protect, userController.updateUser);
router.delete('/user/:id', protect, userController.deleteUser);

module.exports = router;
