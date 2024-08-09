import express, { Application } from 'express';
import { MovieApp } from '../index';
import Server from '../server';

jest.mock('../server', () => {
  return jest.fn().mockImplementation(() => ({
    start: jest.fn(),
  }));
});

let app: Application = express();

describe('MovieApp', () => {
  let serverMock: jest.Mocked<Server>;

  beforeEach(() => {
    serverMock = new Server(app) as jest.Mocked<Server>;
  });

  it('should call server.start() when run() is called', async () => {
    const movieInstence = new MovieApp();

    await movieInstence.run();

    expect(serverMock.start);
  });
});
