import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'weather_status',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    WeatherModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
