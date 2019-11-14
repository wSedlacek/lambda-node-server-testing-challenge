import { db } from '../../dbConfig';
import { Hobbit } from '../../../models/Hobbit';

export const getAll = async () => {
  return db<Hobbit>('hobbits');
};

export const findById = async (id: string | number) => {
  const hobbit = await db<Hobbit>('hobbits')
    .where({ id })
    .first();

  if (!hobbit) throw new Error('404');

  return hobbit;
};

export const insert = async (hobbit: Partial<Hobbit>) => {
  const [id] = await db<Hobbit>('hobbits').insert<number[]>(hobbit);
  return await findById(id);
};

export const update = async (id: string | number, changes: Partial<Hobbit>) => {
  await findById(id);
  await db<Hobbit>('hobbits')
    .update(changes)
    .where({ id });
  return await findById(changes.id || id);
};

export const remove = async (id: string | number) => {
  const hobbit = await findById(id);
  await db<Hobbit>('hobbits')
    .del()
    .where({ id });
  return hobbit;
};
