import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { CustomError, BadRequestException, NotfoundException, formatErrorMsg } from '../middelwares/errorHandler';

describe('CustomError', () => {
  it('should create a CustomError with the correct properties', () => {
    const error = new BadRequestException('Test error message');
    expect(error.status).toBe('fail');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Test error message');
  });

  it('should return an error object with getError method', () => {
    const error = new NotfoundException('Not found');
    const errorObj = error.getError();
    expect(errorObj).toEqual({
      status: 'fail',
      statusCode: 404,
      message: 'Not found',
    });
  });
});

describe('FormatErrorMsg', () => {
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should handle validation errors and return BadRequestException in production', () => {
    const validationError = new ValidationError();
    validationError.constraints = {
      isString: 'Must be a string',
    };

    process.env.NODE_ENV = 'production';

    formatErrorMsg.formatError([validationError], mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'invalid inputs:Must be a string ',
    });
  });

  it('should handle other errors correctly in production', () => {
    const error = new NotfoundException('Resource not found');

    process.env.NODE_ENV = 'production';

    formatErrorMsg.formatError(error, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Resource not found',
    });
  });

  it('should handle server errors correctly in production', () => {
    const error = new Error('Internal server error') as any;
    error.statusCode = 500;

    process.env.NODE_ENV = 'production';

    formatErrorMsg.formatError(error, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Issue occurred, please try again later',
    });
  });

  it('should return full error details in development', () => {
    const error = new BadRequestException('Invalid request');
    error.stack = 'Error stack trace';

    process.env.NODE_ENV = 'development';

    formatErrorMsg.formatError(error, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'fail',
      error,
      message: 'Invalid request',
      stack: 'Error stack trace',
    });
  });
});
