import { firstValueFrom } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { WeatherDto } from '../../app/dto/weather.dto';
import { WeatherValidatorPort } from '../../core/ports/weather-validator.port';
import { WeatherPort } from '../../core/ports/weather.port';

@Injectable()
export class WeatherService implements WeatherPort {
  constructor(private readonly httpService: HttpService) {}

  async getCurrentWeather(
    validator: WeatherValidatorPort
  ): Promise<WeatherDto> {
    const data = await this.fetchData();
    console.log('data fetched, en route for validation...');
    return validator.validate(data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async fetchData(): Promise<any> {
    console.log('fetching data to third party...');
    const response = await firstValueFrom(
      this.httpService.get(
        'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,rain'
      )
    );
    return response.data;
  }
}
