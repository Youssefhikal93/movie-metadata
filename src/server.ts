import express, { Application, NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import {CustomError, NotfoundException } from './middelwares/errorHandler'
import appRoutes from './routes/appRoutes'
import seedDatabase from './utils/seedCsv'
import swaggerConfig from './swaggerConfig'
import { ValidationError } from 'class-validator'

class Server {
  private app: Application

  constructor(app: Application) {
    this.app = app
  }

  public async start():Promise<void> {
    // await sqlConfig.initialize();
    this.setupMiddleware()
    this.setupRoutes()
    this.setupGlobalError()
    await this.seedDatabase();
    this.startServer()
  }

  private setupMiddleware(): void {
    this.app.use(express.json())
    swaggerConfig(this.app)
   
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
      if (Array.isArray(err) && err[0] instanceof ValidationError) {
        const validationErrors = err.map((el: ValidationError) => Object.values(el.constraints!))
        return res.status(400).json({
          status: 'fail',
          message: 'Validation errors',
          errors: validationErrors,
        });
      } 
      
      if (err instanceof CustomError) {
        res.status(err.statusCode).json(err.getError())
      } else if(process.env.NODE_ENV === 'development'){
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
