import HttpStatus from 'http-status-codes';

import * as userService from '../services/userService';
import jwt from 'jsonwebtoken'
import genHash from '../utils/genHash'
import { token } from 'morgan';


/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  userService
    .getAllUsers()
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Get a user by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  userService
    .getUser(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Create a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  userService
    .createUser(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
}

/**
 * Update a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  userService
    .updateUser(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Delete a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteUser(req, res, next) {
  userService
    .deleteUser(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
}
export async function loginUser(req, res, next) {
  let body = req.body;
  let username = body.username;

  try {
    let rawUser = await userService
    .login(username, body.password);
    
    let user = rawUser.attributes;

    let payload = {
      id: user.id
    }
    jwt.sign(payload, "randomthing",  {
      expiresIn: 3600
    }, (err, token) => {
      res.json(Object.assign(user, {token}));
      res.set('access-token', token);
      res.set('expired', '3306');
      res.set('Access-Control-Expose-Headers', 'access-token');
    })


  } catch(err) {
    next(err)
  }

}
export async function fetchMe(req, res, next) {
  try {
    const token = req.header('token');
    const decoded = jwt.verify(token, "randomthing");
    const userId = decoded.id;

    userService.getUser(userId)
    .then(data => res.json({ data }))
    .catch(err => next(err));

  } catch(err) {
    next(err)
  }
}
