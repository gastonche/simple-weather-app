import React from "react";
import { Forecast } from "../domains";
import styles from "./Weather.module.css";

interface WeatherProps {
  today: Forecast;
  days: Forecast[];
}

class Weather extends React.Component<WeatherProps> {
  render(): React.ReactNode {
    return (
      <div className={styles.body}>
        <section className={styles.today}>
          <h1 className={styles.day}>{this.props.today.day}</h1>
          <main className={styles.main}>
            <img src="http://openweathermap.org/img/wn/04n@2x.png" alt="" />
            <div>
              <h2 className={styles.temp}>{this.props.today.temp}&deg;</h2>
              <h3 className={styles.day}>{this.props.today.description}</h3>
            </div>
          </main>
        </section>
        <aside className={styles.forecasts}>
          {this.props.days.map((day) => (
            <div key={day.day} className={styles.forecast}>
              <h1 className={styles.day}>{day.day}</h1>
              <img src="http://openweathermap.org/img/wn/04n@2x.png" alt="" />
              <h2 className={styles.temp}>{day.temp}&deg;</h2>
            </div>
          ))}
        </aside>
      </div>
    );
  }
}

export default Weather;
