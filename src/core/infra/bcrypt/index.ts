import { Encrypter, EncrypterParams } from 'core/app/protocols/encrypter'
import * as bcrypt from 'bcrypt'

export class BcryptEncrypter implements Encrypter {
  async encrypt({ value }: EncrypterParams): Promise<string> {
    await bcrypt.hash(value, 10)
    return null
  }
}
