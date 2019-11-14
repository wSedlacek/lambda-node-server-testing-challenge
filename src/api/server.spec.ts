import * as request from 'supertest';

import { db } from '../data/dbConfig';
import { server } from './server';

describe('server', () => {
  beforeEach(async () => {
    await db('hobbits').truncate();
  });

  describe('GET /', () => {
    it('should return 200 OK', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    });

    it('should return JSON formatted response', async () => {
      const response = await request(server).get('/');
      expect(response.type).toBe('application/json');
    });
  });

  describe('GET /hobbits', () => {
    it('should return an array', async () => {
      const response = await request(server).get('/hobbits');
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should have hobbits from the database', async () => {
      await db('hobbits').insert({ name: 'Fred' });
      const response = await request(server).get('/hobbits');
      const hobbits = response.body;
      expect(hobbits).toHaveLength(1);
      expect(hobbits[0].name).toBe('Fred');
    });
  });

  describe('POST /hobbits', () => {
    it('should insert the hobbit into the database', async () => {
      await request(server)
        .post('/hobbits')
        .send({ name: 'Frodo' });

      const frodo = await db('hobbits')
        .where({ name: 'Frodo' })
        .first();

      expect(frodo).toBeTruthy();
    });

    it('should return the hobbit created', async () => {
      const response = await request(server)
        .post('/hobbits')
        .send({ name: 'Fred' });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.name).toBe('Fred');
    });
  });

  describe('PUT /hobbits/:id', () => {
    it('should update the name of the hobbit', async () => {
      await db('hobbits').insert({ name: 'Fred' });

      const response = await request(server)
        .put('/hobbits/1')
        .send({ name: 'Sam' });

      expect(response.body.name).toBe('Sam');
    });

    it('should not affect other entries', async () => {
      await db('hobbits').insert({ name: 'Fred' });
      await db('hobbits').insert({ name: 'George' });

      await request(server)
        .put('/hobbits/1')
        .send({ name: 'Sam' });

      const george = await db('hobbits')
        .where({ name: 'George' })
        .first();

      expect(george.name).toBeTruthy();
    });
  });

  describe('DELETE /hobbits/:id', () => {
    it('should remove a hobbit from the database', async () => {
      await db('hobbits').insert({ name: 'Fred' });
      await request(server).delete('/hobbits/1');

      const fred = await db('hobbits')
        .where({ name: 'Fred' })
        .first();

      expect(fred).toBeFalsy();
    });

    it('should not affect other hobbits', async () => {
      await db('hobbits').insert({ name: 'Fred' });
      await db('hobbits').insert({ name: 'George' });
      await request(server).delete('/hobbits/1');

      const george = await db('hobbits')
        .where({ name: 'George' })
        .first();

      expect(george).toBeTruthy();
    });
  });
});
