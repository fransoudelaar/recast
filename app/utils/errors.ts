export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class ExternalApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExternalApiError';
  }
}
