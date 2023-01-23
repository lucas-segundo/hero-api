export type EncrypterParams = {
  payload: any
}

export interface Encrypter {
  encrypt(params: EncrypterParams): Promise<string>
}
