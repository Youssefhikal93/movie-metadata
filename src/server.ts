import express, { Application, NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import { CustomError, NotfoundException } from './middelwares/errorHandler'
import appRoutes from './routes/appRoutes'
import seedDatabase from './utils/seedCsv'


class Server {
  private app: Application

  constructor(app: Application) {
    this.app = app
  }

  public start():void {
    this.setupMiddleware()
    this.setupRoutes()
    this.setupGlobalError()
    this.startServer()
    this.seedDatabase();
  }

  private setupMiddleware(): void {
    this.app.use(express.json())
  }
  private setupRoutes(): void {
    appRoutes(this.app)
  }

  private setupGlobalError(): void {
    this.app.all('*', (req, res, next) => {
      return next(new NotfoundException(`URL is not found ${req.originalUrl}`))
    })
    //global error
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof CustomError) {
        res.status(err.statusCode).json(err.getError())
      }else {
        if(process.env.ENV === 'development'){

          res.status(500).json({
            status :err.status , 
            error: err,
            message:err.message ,
            stack: err.stack,})
          }else {
            res.status(500).json({
              status:'fail',
              message:'Issue occurred, please try again later'
            })
          }
      }
      next()
    })
  }

  private startServer():void {
    const port = process.env.PORT! || 80

    this.app.listen(port, () => {
      console.log(`App listening to ${port}`)
    })
  }
  private async seedDatabase(): Promise<void> {
    await seedDatabase();
  }

}

export default Server
