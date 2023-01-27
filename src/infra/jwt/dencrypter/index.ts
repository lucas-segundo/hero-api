import { Dencrypter, DencrypterParams } from 'app/protocols/dencrypter'
import * as jwt from 'jsonwebtoken'

export class JwtDencrypter implements Dencrypter {
  async dencrypt<Data>({ token }: DencrypterParams): Promise<Data> {
    const tokenDecrypted = jwt.verify(token, process.env.JWT_SECRET)

    return tokenDecrypted as Data
  }
}
