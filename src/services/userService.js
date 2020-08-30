import Boom from '@hapi/boom';

import User from '../models/user';
import {compareHash} from '../utils/genHash'
import { use } from 'chai';



export function login(username, password) {
  return new User().where({
    name: username,
  })
  .fetch()
  .then(async user => {
    let dbPassword = user.attributes.password;
    let isMatch = await compareHash(dbPassword, password);
    if (isMatch) {
      return user;
    } else {
      throw Boom.notFound('Incorect Password!')
    }
  })
  .catch(User.NotFoundError, () => {
      throw Boom.notFound('Incorect user');
  });
}

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function getAllUsers() {
  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getUser(id) {
  return new User({ id })
    .fetch()
    .then(user => user)
    .catch(User.NotFoundError, () => {
      throw Boom.notFound('User not found');
    });
}

/**
 * Create new user.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */
export function createUser(user) {
  return new User({ name: user.name }).save();
}

/**
 * Update a user.
 *
 * @param   {Number|String}  id
 * @param   {Object}         user
 * @returns {Promise}
 */
export function updateUser(id, user) {
  return new User({ id }).save({ name: user.name });
}

/**
 * Delete a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}
