import { ValidationError } from 'class-validator';
import { Response } from 'express';

export abstract class CustomError extends Error {
  abstract status: string;
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
  }
  public getError() {
    return {
      status: this.status,
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

export class BadRequestException extends CustomError {
  status: string = 'fail';
  statusCode: number = 400;
  constructor(message: string) {
    super(message);
  }
}

export class NotfoundException extends CustomError {
  status: string = 'fail';
  statusCode: number = 404;

  constructor(message: string) {
    super(message);
  }
}

class FormatErrorMsg {
  public formatError(err: any, res: Response) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
      this.sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
      if (Array.isArray(err) && err[0] instanceof ValidationError) {
        err = this.handleVlidationDB(err);
      }
      this.sendErrorProd(err, res);
    }
  }
  private handleVlidationDB = (err: any) => {
    const validationErrors = err.map((el: ValidationError) => Object.values(el.constraints!));
    return new BadRequestException(`invalid inputs:${validationErrors} `);
  };
  private sendErrorDev = (err: any, res: Response) => {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  };

  private sendErrorProd = (err: any, res: Response) => {
    if (err.statusCode !== 500) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else
      return res.status(500).json({
        status: 'error',
        message: 'Issue occurred, please try again later',
      });
  };
}
export const formatErrorMsg = new FormatErrorMsg();
