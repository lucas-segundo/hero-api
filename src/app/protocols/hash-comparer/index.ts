export type HashComparerParams = {
  hashedValue: string
  value: string
}

export interface HashComparer {
  compare(params: HashComparerParams): Promise<boolean>
}
