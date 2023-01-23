export type HasherParams = {
  value: string
}

export interface Hasher {
  hash(params: HasherParams): Promise<string>
}
