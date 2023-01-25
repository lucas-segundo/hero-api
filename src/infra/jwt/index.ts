import { Encrypter, EncrypterParams } from 'app/protocols/encrypter'
import * as jwt from 'jsonwebtoken'

export class JwtEncrypter implements Encrypter {
  async encrypt({ payload }: EncrypterParams): Promise<string> {
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    })

    return null
  }
}
