import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class PostgreSQLConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      username: this.configService.get<string>('POSTGRE_DB_USERNAME'),
      password: this.configService.get<string>('POSTGRE_DB_PASSWORD'),
      port: +this.configService.get<number>('POSTGRE_DB_PORT'),
      host: this.configService.get<string>('POSTGRE_DB_HOST'),
      database: this.configService.get<string>('POSTGRE_DB_DATABASE'),
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
