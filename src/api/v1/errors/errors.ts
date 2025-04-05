export class BaseError extends Error {
    public code: string | number;
  
    constructor(message: string, code: string | number) {
      super(message);
      this.code = code;
      this.name = this.constructor.name;
      // Maintains proper stack trace (only available on V8)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  /**
   * AuthenticationError is thrown when authentication fails.
   */
  export class AuthenticationError extends BaseError {
    constructor(message: string, code: string | number = "AUTH_ERROR") {
      super(message, code);
    }
  }
  
  /**
   * AuthorizationError is thrown when a user doesn't have sufficient permissions.
   */
  export class AuthorizationError extends BaseError {
    constructor(message: string, code: string | number = "AUTHZ_ERROR") {
      super(message, code);
    }
  }
  
  /**
   * RepositoryError is thrown for errors related to database operations.
   */
  export class RepositoryError extends BaseError {
    constructor(message: string, code: string | number = "REPO_ERROR") {
      super(message, code);
    }
  }
  
  /**
   * ServiceError is thrown for errors that occur in the business logic layer.
   */
  export class ServiceError extends BaseError {
    constructor(message: string, code: string | number = "SERVICE_ERROR") {
      super(message, code);
    }
  }
  