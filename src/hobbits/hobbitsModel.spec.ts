import { db } from '../data/dbConfig';
import { insert } from './hobbitsModel';

describe('hobbits model', () => {
  beforeAll(async () => {
    await db('hobbits').truncate();
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
});
