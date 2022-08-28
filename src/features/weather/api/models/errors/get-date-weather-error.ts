import { CustomError } from '../../../../../models/errors/custom-error';

export class GetDateWeatherError extends CustomError {
  statusCode = 500;
  // TODO this should be a constants
  message: string;

  constructor(message: string) {
    super(message);

    this.message = message;

    Object.setPrototypeOf(this, GetDateWeatherError.prototype);
  }

  serializeErrors(): string[] {
    return [this.message];
  }
}
