export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // TODO not needed much
  // abstract serializeErrors(): { message: string; field?: string }[];
  abstract serializeErrors(): string[];
}

// TODO test - move this elsewhere and use this everywhere

export type ResultResponse<V> = {
  // ok: boolean;
  // TODO test
  // ok: boolean;
  value?: V;
  errors?: string[];
  type: "success" | "failure"
};
