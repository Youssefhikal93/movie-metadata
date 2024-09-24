import express, { Application, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { CustomError, formatErrorMsg, NotfoundException } from './middelwares/errorHandler';
import appRoutes from './routes/appRoutes';
import seedDatabase from './utils/seedCsv';
import swaggerConfig from '../swaggerConfig';
import { Server as HttpServer } from 'http'

class Server {
  private app: Application;
  private server: HttpServer

  constructor(app: Application) {
    this.app = app;
  }

  public async start(): Promise<void> {
    this.setupMiddleware();
    this.setupRoutes();
    this.setupGlobalError();
    await this.seedDatabase();
    this.startServer();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    swaggerConfig(this.app);
  }
  private setupRoutes(): void {
    appRoutes(this.app);
  }

  private setupGlobalError(): void {
    this.app.all('*', (req, res, next) => {
      return next(new NotfoundException(`URL is not found ${req.originalUrl}`));
    });
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof CustomError) {
        res.status(err.statusCode).json(err.getError());
      } else {
        formatErrorMsg.formatError(err, res);
      }

      next();
    });
  }

  private startServer() {
    const port = process.env.PORT! || 3000;

    this.server = this.app.listen(port, () => {
      console.log(`App listening to ${port}`);

      process.on('unhandledRejection', (err: any) => {
        console.error('Unhandled Rejection:', err);
        process.exit(1);
      });
    });
    // return this.server
  }
  private async seedDatabase(): Promise<void> {
    await seedDatabase();
  }

  private async stopServer(): Promise<void> {
    this.server.close()
  }

}

export default Server;
