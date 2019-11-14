import { db } from '../data/dbConfig';

export const insert = async (hobbit) => {
  const [id] = await db('hobbits').insert(hobbit);
  const saved = await db('hobbits')
    .where({ id })
    .first();

  return saved;
};

export const update = async (id, changes) => {
  return null;
};

export const remove = async (id) => {
  return null;
};

export const getAll = async () => {
  return db('hobbits');
};

export const findById = (id) => {
  return null;
};
