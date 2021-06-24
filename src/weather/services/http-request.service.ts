import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { WeatherStatus } from '../entities/weatherStatus.entity';
import { apiKey, units } from '../../../config';

@Injectable()
export class HttpRequestService {

  constructor(private httpService: HttpService) {}

  async getWeatherStatusFromAPI(city: string): Promise<WeatherStatus> {
    const data = await this.httpService.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`,
        { headers: { 'Accept': 'application/json' } })
        .pipe(
          map(response => response.data)
        ).toPromise();

    return new WeatherStatus(data)
  }

}
