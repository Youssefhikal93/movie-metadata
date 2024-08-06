
export abstract class CustomError extends Error {
    abstract status: string 
    abstract statusCode: number 
    constructor(message: string) {
      super(message)
    }
     public getError() {
      return {
        status: this.status,
        statusCode: this.statusCode,
        message: this.message
      }
    }
  }


  
  export class BadRequestException extends CustomError {
    status: string = 'Fail'
    statusCode: number = 400
    constructor(message: string) {
      super(message)
    }
  }

  
  export class NotfoundException extends CustomError {
    status: string = 'Fail'
    statusCode: number = 404
  
    constructor(message: string) {
      super(message)
    }
  }
  
  export class InternalServelException extends CustomError {
    status: string = 'error'
    statusCode: number = 500
  
    constructor(message: string) {
      super(message)
    }
    
  }
