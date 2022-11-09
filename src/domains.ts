export interface Forecast {
  day: string;
  temp: number;
  description: string;
  icon: string;
}

export interface City {
  name: string;
  lat: number;
  lon: number;
}