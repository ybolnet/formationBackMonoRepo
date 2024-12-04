export class WeatherDto {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    rain: string;
  };
  current: WeatherCurrentDto;

  // eslint-disable-next-line sonarjs/sonar-max-params
  constructor(
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    timezone: string,
    timezone_abbreviation: string,
    elevation: number,
    current_units: {
      time: string;
      interval: string;
      temperature_2m: string;
      rain: string;
    },
    current: WeatherCurrentDto
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.generationtime_ms = generationtime_ms;
    this.utc_offset_seconds = utc_offset_seconds;
    this.timezone = timezone;
    this.timezone_abbreviation = timezone_abbreviation;
    this.elevation = elevation;
    this.current_units = current_units;
    this.current = current;
  }
}

export class WeatherCurrentDto {
  time: string;
  interval: number;
  temperature_2m: number;
  rain: number;

  constructor(
    time: string,
    interval: number,
    temperature_2m: number,
    rain: number
  ) {
    this.time = time;
    this.interval = interval;
    this.temperature_2m = temperature_2m;
    this.rain = rain;
  }
}
