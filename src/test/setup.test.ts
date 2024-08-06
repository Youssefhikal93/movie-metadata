import express, { Application } from 'express';
import Server from '../server';


const createTestServer = async () => {
  const app: Application = express();
  

const server= new Server(app) 
await server.start();

  return app      
            
};

export default createTestServer;

describe.skip('Setup Test', () => {
  it('should pass this dummy test', () => {
    expect(true).toBe(true);
  });
});