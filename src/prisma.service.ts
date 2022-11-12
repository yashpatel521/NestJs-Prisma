import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { logColor, QUERYLOG } from './constants/constants';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>
  implements OnModuleInit
{
  constructor() {
    super({
      log: QUERYLOG,
    });
  }

  setColor(string: string | string[] | undefined, color: string) {
    return color + string + logColor.Reset;
  }

  async onModuleInit() {
    await this.$connect().then(() => {
      console.log('CONNECTED TO DATABASE');
    });

    this.$use(async (params, next) => {
      if (params.action == 'create' && params.model == 'User') {
        const user = params.args.data;
        user.password = await bcrypt.hash(user.password, 12);
        params.args.data = user;
      }

      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      let message = `Query ${params.model}.${params.action} took ${
        after - before
      }ms`;
      message = this.setColor(message, logColor.BgBlue);
      console.log(message);

      return result;
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
