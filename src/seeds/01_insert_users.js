import genHash from '../utils/genHash'
/**
 * Delete all existing entries and seed users table.
 *
 * @param   {Object} knex
 * @returns {Promise}
 */
export async function seed(knex) {
  let hash = await genHash('hold_up');
  
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert([
        {
          name: 'Saugat Acharya',
          updated_at: new Date(),
          password: hash
        },
        {
          name: 'John Doe',
          updated_at: new Date(),
          password: hash
        }
      ]);
    });
}
