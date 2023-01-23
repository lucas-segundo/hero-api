export class WrongPasswordError extends Error {
  constructor() {
    super('User password is wrong.')
  }
}
