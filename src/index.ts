import express, { Application } from 'express'
import 'express-async-errors'
import Server from './server'


class MovieApp {
  public async  run(): Promise<void> {
    const app: Application = express()
    const server: Server = new Server(app)

    
    server.start()
  }
}

const movieApp: MovieApp = new MovieApp()
movieApp.run()
