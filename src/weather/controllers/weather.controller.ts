import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WeatherService } from '../services/weather.service';

@Controller('api/weather')
export class WeatherController {

  constructor(private weatherService: WeatherService) {}

  @Get(':city')
  async getWeatherInfo(@Param('city') city: string){
    const response = await this.weatherService.getCitiesWeatherStatus([city])
    return response[0] 
  }

  @Post()
  getCitiesWeatherInfo(@Body() body) {
    return this.weatherService.getCitiesWeatherStatus(body.cities)
  }
}
