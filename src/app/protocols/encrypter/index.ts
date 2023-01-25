export type EncrypterParams = {
  payload: Record<string, any>
}

export interface Encrypter {
  encrypt(params: EncrypterParams): Promise<string>
}
