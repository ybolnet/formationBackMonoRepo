import { WeatherDto } from '../../app/dto/weather.dto';
import { WeatherValidatorPort } from './weather-validator.port';

export const WeatherPortToken = Symbol('WeatherPort');

export interface WeatherPort {
  getCurrentWeather(validator: WeatherValidatorPort): Promise<WeatherDto>;
}
