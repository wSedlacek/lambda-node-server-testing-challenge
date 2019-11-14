import * as request from 'supertest';
import { server } from './server';

describe('server', () => {
  describe('GET /', () => {
    it('should return 200 OK', async () => {
      await request(server)
        .get('/')
        .expect(200);
    });

    it('should return JSON formatted response', async () => {
      await request(server).get('/');
    });
  });
});
