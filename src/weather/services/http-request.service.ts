import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { WeatherStatus } from '../entities/weatherStatus.entity';

@Injectable()
export class HttpRequestService {

  constructor(private httpService: HttpService) {}

  async getWeatherStatusFromAPI(city: string): Promise<WeatherStatus> {
    const data = await this.httpService.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=42e933916e075bec2020bb8d56356c15`,
        { headers: { 'Accept': 'application/json' } })
        .pipe(
          map(response => response.data)
        ).toPromise();

    return new WeatherStatus(data)
  }

}
