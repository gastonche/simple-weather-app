import React from "react";
import "./App.css";
import Cities from "./Cities/Cities";
import { Forecast } from "./domains";
import Weather from "./Weather/Weather";

interface AppState {
  cities: string[];
  currentCity: number;
  forecasts: {
    [k: string]: {
      today: Forecast;
      days: Forecast[];
    };
  };
}

class App extends React.Component<{}, AppState> {
  constructor() {
    super({});
    this.state = {
      cities: ["Ottawa", "Moscow", "Tokyo"],
      currentCity: 0,
      forecasts: {
        Ottawa: {
          today: { day: "Today", temp: 19.3, description: "Clouds" },
          days: [
            { day: "Mon", temp: 19.3, description: "Clouds" },
            { day: "Tue", temp: 19.3, description: "Clouds" },
            { day: "Wed", temp: 19.3, description: "Clouds" },
            { day: "Thur", temp: 19.3, description: "Clouds" }
          ],
        },
      },
    };
  }

  get forecasts() {
    return (
      this.state.forecasts[this.state.cities[this.state.currentCity]] || {
        today: {},
        days: [],
      }
    );
  }

  changeCity(index: number) {
    this.setState({
      currentCity: index,
    });
  }

  render(): React.ReactNode {
    return (
      <div className="root">
        <Cities
          cities={this.state.cities}
          currentIndex={this.state.currentCity}
          onChange={this.changeCity.bind(this)}
        />
        <Weather {...this.forecasts} />
      </div>
    );
  }
}

export default App;
