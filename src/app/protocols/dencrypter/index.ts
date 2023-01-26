export type DencrypterParams = {
  token: string
}

export interface Dencrypter {
  dencrypt<Data>(params: DencrypterParams): Promise<Data>
}
