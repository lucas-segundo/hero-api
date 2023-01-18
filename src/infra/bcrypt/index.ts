import { Encrypter, EncrypterParams } from 'app/protocols/encrypter'
import * as bcrypt from 'bcrypt'

export class BcryptEncrypter implements Encrypter {
  async encrypt({ value }: EncrypterParams): Promise<string> {
    const hashedValue = await bcrypt.hash(value, 10)
    return hashedValue
  }
}
