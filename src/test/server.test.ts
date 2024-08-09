import express, { Application } from 'express';
import Server from '../server';
import request from 'supertest';

jest.mock('../utils/seedCsv', () => jest.fn().mockResolvedValue(null));

describe('Server', () => {
  let app: Application;
  let serverInstance: Server;

  beforeAll(async () => {
    app = express();
    serverInstance = new Server(app);
    await serverInstance.start();
  });

  it('should respond with 404 for an unknown route', async () => {
    const res = await request(app).get('/unknown-route');

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('URL is not found /unknown-route');
  });

  it('should setup middleware and routes correctly', () => {
    expect(app._router).toBeDefined();
    expect(app._router.stack.length).toBeGreaterThan(0);
  });
});
