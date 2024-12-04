import { z } from 'zod';

import { WeatherDto } from '../../app/dto/weather.dto';
import { WeatherValidatorPort } from '../../core/ports/weather-validator.port';

const WeatherCurrentSchema = z.object({
  time: z.string(),
  interval: z.number().positive().int(),
  temperature_2m: z.number(),
  rain: z.number().nonnegative(),
});

const WeatherDtoSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number().nonnegative(),
  utc_offset_seconds: z.number().int(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  current_units: z.object({
    time: z.string(),
    interval: z.string(),
    temperature_2m: z.string(),
    rain: z.string(),
  }),
  current: WeatherCurrentSchema,
});

export class WeatherValidator implements WeatherValidatorPort {
  validate(data: unknown): WeatherDto {
    console.log('validating data...');
    return WeatherDtoSchema.parse(data) as WeatherDto;
  }
}
