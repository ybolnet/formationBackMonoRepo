import { Inject, Injectable } from '@nestjs/common';

import { WeatherDto } from '../../app/dto/weather.dto';
import { Weather } from '../entities/weather.entity';
import {
	WeatherValidatorPort,
	WeatherValidatorPortToken,
} from '../ports/weather-validator.port';
import { WeatherPort, WeatherPortToken } from '../ports/weather.port';

@Injectable()
export class GetWeatherUseCase {
  constructor(
    @Inject(WeatherPortToken)
    private readonly weatherPort: WeatherPort,
    @Inject(WeatherValidatorPortToken)
    private readonly weatherValidatorPort: WeatherValidatorPort
  ) {}

  async execute(): Promise<Weather> {
    console.log('executing UC');
    const weatherDto = await this.weatherPort.getCurrentWeather(
      this.weatherValidatorPort
    );
    return this.map(weatherDto);
  }

  private map(dto: WeatherDto): Weather {
    return {
      latitude: dto.latitude,
      longitude: dto.longitude,
      generationtime_ms: dto.generationtime_ms,
      utc_offset_seconds: dto.utc_offset_seconds,
      timezone: dto.timezone,
      timezone_abbreviation: dto.timezone_abbreviation,
      elevation: dto.elevation,
      time: dto.current.time,
      interval: dto.current.interval,
      temperature_2m: dto.current.temperature_2m,
      rain: dto.current.rain,
    } as Weather;
  }
}
