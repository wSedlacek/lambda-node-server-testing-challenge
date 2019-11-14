import { db } from '../../dbConfig';
import { getAll, insert, findById, update, remove } from './hobbits';

describe('Hobbits database helper', () => {
  beforeEach(async () => {
    await db('hobbits').truncate();
  });

  describe('getAll()', () => {
    it('should return an array', async () => {
      const hobbits = await getAll();
      expect(Array.isArray(hobbits)).toBe(true);
    });

    it('should have recently added hobbits', async () => {
      await db('hobbits').insert({ name: 'Sam' });

      const hobbits = await getAll();
      expect(hobbits.find((hobbit) => hobbit.name === 'Sam')).toBeTruthy();
    });
  });

  describe('findById()', () => {
    it('should throw if a matching hobbit is not found', async () => {
      expect.assertions(1);
      try {
        await findById(0);
      } catch (err) {
        expect(err).toBeTruthy();
      }
    });

    it('should return a hobbit of matching ID', async () => {
      const [id] = await db('hobbits').insert({ name: 'Sam' });
      const hobbit = await findById(id);
      expect(hobbit.id).toBe(id);
    });
  });

  describe('insert()', () => {
    it('should insert a hobbit', async () => {
      await insert({ name: 'Sam' });
      const hobbits = await db('hobbits');
      expect(hobbits).toHaveLength(1);
    });

    it('should insert the provided hobbit', async () => {
      await insert({ name: 'George' });
      const george = await db('hobbits')
        .where({ name: 'George' })
        .first();

      expect(george.name).toBe('George');
    });

    it('should return the inserted hobbit', async () => {
      const fred = await insert({ name: 'Fred' });
      expect(fred.name).toBe('Fred');
      expect(fred.id).toBeDefined();
    });
  });

  describe('update()', () => {
    it('should throw if ID is not found', async () => {
      expect.assertions(1);
      try {
        await update(0, { name: 'New Sam' });
      } catch (err) {
        expect(err).toBeTruthy();
      }
    });

    it('should update a hobbit', async () => {
      const [id] = await db('hobbits').insert({ name: 'Sam' });
      await update(id, { name: 'New Sam' });
      const newSam = await db('hobbits').where({ name: 'New Sam' });
      expect(newSam).toBeTruthy();
    });

    it('should not alter the number of hobbits', async () => {
      const [id] = await db('hobbits').insert({ name: 'Sam' });
      const hobbitsBefore = await db('hobbits');
      await update(id, { name: 'New Sam' });
      const hobbitsAfter = await db('hobbits');
      expect(hobbitsBefore).toHaveLength(hobbitsAfter.length);
    });
  });

  describe('remove()', () => {
    it('should throw if the ID is not found', async () => {
      expect.assertions(1);
      try {
        await remove(0);
      } catch (err) {
        expect(err).toBeTruthy();
      }
    });

    it('should reduce the number of hobbits by one', async () => {
      await db('hobbits').insert({ name: 'Fred' });
      const [id] = await db('hobbits').insert({ name: 'Sam' });
      const hobbitsBefore = await db('hobbits');
      await remove(id);
      const hobbitsAfter = await db('hobbits');
      expect(hobbitsAfter).toHaveLength(hobbitsBefore.length - 1);
    });
  });
});
