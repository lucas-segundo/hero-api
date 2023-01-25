import { NestFactory } from '@nestjs/core'
import { KnexDbHandler } from 'infra/knex/config/knex-db-handler'
import { AppModule } from './routes/app.module'

async function bootstrap() {
  await KnexDbHandler.connect('dev')
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()
