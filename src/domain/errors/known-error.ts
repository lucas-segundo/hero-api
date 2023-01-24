export class KnownError extends Error {
  constructor(description: string) {
    super(description)
  }
}
