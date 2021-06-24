import { HttpModule, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { WeatherController } from './controllers/weather.controller';
import { WeatherService } from './services/weather.service';
import { HttpRequestService } from './services/http-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherStatus } from './entities/weatherStatus.entity';
import { ResponseTimeMiddleware } from '@nest-middlewares/response-time';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeatherStatus]),
    HttpModule
  ],
  controllers: [WeatherController],
  providers: [WeatherService, HttpRequestService],
  exports: [TypeOrmModule]
})
export class WeatherModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeMiddleware).forRoutes(
      { path: 'api/weather/*', method: RequestMethod.GET}, 
      { path: 'api/weather', method: RequestMethod.POST}
    )
  }
}
