export class AppError extends Error {
  readonly statusCode?: number;
  readonly message: string;
  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
