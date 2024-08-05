import express, { Application } from 'express';
import Server from '../server';
import sqlConfig from '../../ormconfig';
import seedDatabase from '../utils/seedCsv';

// Function to create the server
const createTestServer = async () => {
  const app: Application = express();
  

const server= new Server(app)  
await server.start();

  return app       
            
};

export default createTestServer;

//  sqlConfig.initialize().then(()=>console.log('data created for test')).catch(error=>console.log(error));

describe('Setup Test', () => {
  it('should pass this dummy test', () => {
    expect(true).toBe(true);
  });
});