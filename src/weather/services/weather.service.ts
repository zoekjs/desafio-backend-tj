import { Injectable } from '@nestjs/common';
import { WeatherStatus } from '../entities/weatherStatus.entity';
import { ReadWeatherStatusDto } from '../dto/ReadWeatherStatusDTO.dto';
import { HttpRequestService } from './http-request.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class WeatherService {

  constructor(@InjectRepository(WeatherStatus) private weatherStatusRepository: Repository < WeatherStatus > ,
    private httpRequestService: HttpRequestService) {}

  async getCitiesWeatherStatus(cities: string[]): Promise < ReadWeatherStatusDto[] > {
    return Promise.all(cities.map(async city => {
      const existWeatherStatus = await this.getWeatherStatus(city);
      const weatherStatus: ReadWeatherStatusDto = (existWeatherStatus)
        ? existWeatherStatus
        : await this.createWeatherStatus(city)
      return weatherStatus;
    }))
  }

  async createWeatherStatus(city: string): Promise < ReadWeatherStatusDto > {
    const weatherStatus = await this.httpRequestService.getWeatherStatusFromAPI(city)
    const savedData = await this.weatherStatusRepository.save(this.weatherStatusRepository.create(weatherStatus))
    return plainToClass(ReadWeatherStatusDto, savedData)
  }

  async getWeatherStatus(city: string): Promise < ReadWeatherStatusDto > {
    const search = await this.weatherStatusRepository.findOne({
      where: {
        city: this.capitalizeFirstLetter(city)
      },
      order: {
        created_at: 'DESC'
      }
    })
    return plainToClass(ReadWeatherStatusDto, search)
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}