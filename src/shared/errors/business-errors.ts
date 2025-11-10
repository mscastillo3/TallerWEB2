export class BusinessLogicException extends Error {
  type: BusinessError;

  constructor(message: string, type: BusinessError) {
    super(message);
    this.name = 'BusinessLogicException';
    this.type = type;
    Object.setPrototypeOf(this, BusinessLogicException.prototype);
  }
}

export enum BusinessError {
  NOT_FOUND,
  PRECONDITION_FAILED,
  BAD_REQUEST,
}
