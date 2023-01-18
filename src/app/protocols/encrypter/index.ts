export type EncrypterParams = {
  value: string
}

export interface Encrypter {
  encrypt(params: EncrypterParams): Promise<string>
}
