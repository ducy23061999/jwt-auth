import { Router } from 'express';

import * as userController from '../controllers/users';
import { findUser, userValidator } from '../validators/userValidator';
import auth from '../middlewares/auth'

const router = Router();


/**
 * POST /api/users/login
 */
router.post('/login', userController.loginUser);
router.get('/me', auth, userController.fetchMe);

/**
 * POST /api/users/register
 */
router.post('/register', userController.create);

/**
 * GET /api/users
 */
router.get('/', userController.fetchAll);

/**
 * GET /api/users/:id
 */
router.get('/:id', userController.fetchById);

/**
 * POST /api/users
 */
router.post('/', userValidator, userController.create);

/**
 * PUT /api/users/:id
 */
router.put('/:id', findUser, userValidator, userController.update);

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', findUser, userController.deleteUser);

export default router;
