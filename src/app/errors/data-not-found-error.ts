export class DataNotFoundError extends Error {
  constructor(name: string) {
    super(`${name} not found in database.`)
  }
}
