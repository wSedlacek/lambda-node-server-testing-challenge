import * as express from 'express';
import {
  getAll,
  insert,
  update,
  remove
} from '../data/helpers/hobbits/hobbits';

export const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/hobbits', async (req, res) => {
  const hobbits = await getAll();
  res.json(hobbits);
});

server.post('/hobbits', async ({ body }, res) => {
  const hobbit = await insert(body);
  res.status(201).json(hobbit);
});

server.put('/hobbits/:id', async ({ body, params: { id } }, res) => {
  const hobbit = await update(id, body);
  res.json(hobbit);
});

server.delete('/hobbits/:id', async ({ params: { id } }, res) => {
  const hobbit = await remove(id);
  res.json(hobbit);
});
