import { OnModuleDestroy } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: [process.env.KAKFA_ENDPOINT ?? ''],
        sasl: {
          mechanism: 'scram-sha-256',
          username: process.env.KAFKA_USER ?? '',
          password: process.env.KAFKA_PASSWORD ?? '',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
