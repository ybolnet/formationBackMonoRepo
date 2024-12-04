import { WeatherDto } from '../../app/dto/weather.dto';

export const WeatherValidatorPortToken = Symbol('WeatherValidatorPort');

export interface WeatherValidatorPort {
  validate(data: unknown): WeatherDto;
}
