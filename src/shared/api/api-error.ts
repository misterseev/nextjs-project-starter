export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message = "The upstream request failed.",
  ) {
    super(message);
    this.name = "ApiError";
  }
}
