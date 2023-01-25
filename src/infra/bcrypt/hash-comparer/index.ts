import { HashComparer, HashComparerParams } from 'app/protocols/hash-comparer'
import * as bcrypt from 'bcrypt'

export class BcryptHashComparer implements HashComparer {
  async compare({ value, hashedValue }: HashComparerParams): Promise<boolean> {
    return await bcrypt.compare(value, hashedValue)
  }
}
