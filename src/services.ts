import { City, Forecast } from "./domains";

const API_KEY = "f8a1503e18b20e9d4623b942c6463188";

interface ReduceAcc {
  dates: string[];
  forecasts: Forecast[];
}

function getForecastDate(dt: string) {
  const date = new Date(dt);
  if (date.toDateString() === new Date().toDateString()) {
    return "Today";
  }
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
}

function formatForecastResponse([today, ...days]: Forecast[]) {
  return {today, days}
}

export default function fetchCurrentWeather({ lat, lon }: City) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
  )
    .then((res) => res.json())
    .then(({ list }) => {
      return list
        .reduce(
          (
            acc: ReduceAcc,
            {
              dt_txt,
              main,
              weather: [weather],
            }: { dt_txt: string; main: any; weather: any }
          ) => {
            const date = getForecastDate(dt_txt);
            if (!acc.dates.includes(date)) {
              acc.dates.push(date);
              acc.forecasts.push({
                day: date,
                temp: main.temp,
                description: weather.description,
                icon: weather.icon,
              });
            }

            return acc;
          },
          {
            dates: [],
            forecasts: [],
          }
        )
        .forecasts.slice(0, 5);
    }).then(formatForecastResponse);
}
