import { Hasher, HasherParams } from 'app/protocols/hasher'
import * as bcrypt from 'bcrypt'

export class BcryptHasher implements Hasher {
  async hash({ value }: HasherParams): Promise<string> {
    const hashedValue = await bcrypt.hash(value, 10)
    return hashedValue
  }
}
