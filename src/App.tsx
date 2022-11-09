import React from "react";
import "./App.css";
import Cities from "./Cities/Cities";
import { City, Forecast } from "./domains";
import fetchCurrentWeather from "./services";
import Weather from "./Weather/Weather";

interface AppState {
  loading: boolean;
  cities: City[];
  currentCity: number;
  forecasts: {
    [k: string]: {
      today: Forecast;
      days: Forecast[];
    };
  };
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      cities: [
        { name: "Ottawa", lat: 45.4208777, lon: -75.6901106 },
        { name: "Moscow", lat: 55.7504461, lon: 37.6174943 },
        { name: "Tokyo", lat: 35.709674, lon: 139.454224 },
      ],
      currentCity: 0,
      forecasts: {
        Ottawa: {
          today: {
            day: "Today",
            temp: 19.3,
            description: "Clouds",
            icon: "01n",
          },
          days: [
            { day: "Mon", temp: 19.3, description: "Clouds", icon: "01n" },
            { day: "Tue", temp: 19.3, description: "Clouds", icon: "01n" },
            { day: "Wed", temp: 19.3, description: "Clouds", icon: "01n" },
            { day: "Thur", temp: 19.3, description: "Clouds", icon: "01n" },
          ],
        },
      },
    };
  }

  componentDidMount(): void {
    if (this.state.loading) return;
    this.setState({ loading: true });
    Promise.all(this.state.cities.map(fetchCurrentWeather)).then((res) => {
      const forecasts = this.state.cities.reduce(
        (acc: any, { name }, index) => {
          acc[name] = res[index];
          return acc;
        },
        {}
      );

      this.setState({
        forecasts,
        loading: false,
      });
    });
  }

  get forecasts() {
    return (
      this.state.forecasts[this.state.cities[this.state.currentCity].name] || {
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
      <div className="App">
        {this.state.loading && <div className="bg">Loading...</div>}
        <Cities
          cities={this.state.cities.map(({ name }) => name)}
          currentIndex={this.state.currentCity}
          onChange={this.changeCity.bind(this)}
        />
        <Weather {...this.forecasts} />
      </div>
    );
  }
}

export default App;
